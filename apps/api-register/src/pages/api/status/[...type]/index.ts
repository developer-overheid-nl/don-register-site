import {
  API_ENDPOINT,
  API_URL,
  API_VERSION,
  API_X_API_KEY,
} from "astro:env/server";
import type { APIRoute } from "astro";

const AVAILABLE_TYPES = ["text", "html", "json"] as const;
type StatusType = (typeof AVAILABLE_TYPES)[number];

export const GET: APIRoute = async ({ params }) => {
  const { type = "text" } = params;

  if (!AVAILABLE_TYPES.includes(type as StatusType)) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const endpointUrl = `${API_URL}/${API_ENDPOINT}/${API_VERSION}`;
  const startTime = performance.now();

  const checkReachable = async () => {
    try {
      const response = await fetch(`${endpointUrl}/openapi.json`);
      return { ok: response.ok, statusCode: response.status };
    } catch {
      return { ok: false, statusCode: 0 };
    }
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch(`${endpointUrl}/apis`, {
        headers: API_X_API_KEY ? { "x-api-key": API_X_API_KEY } : {},
      });
      return {
        ok: response.ok,
        statusCode: response.status,
        unauthorized: response.status === 401,
      };
    } catch {
      return { ok: false, statusCode: 0, unauthorized: false };
    }
  };

  const [reachable, authenticated] = await Promise.all([
    checkReachable(),
    checkAuthenticated(),
  ]);

  const up = reachable.ok && authenticated.ok;

  const status = {
    endpoint: API_ENDPOINT,
    url: endpointUrl,
    up,
    reachable,
    authenticated,
    responseTime: Math.round(performance.now() - startTime),
    checkedAt: new Date().toISOString(),
  };

  switch (type as StatusType) {
    case "json":
      return new Response(JSON.stringify(status), {
        status: up ? 200 : 503,
        headers: { "Content-Type": "application/json" },
      });

    case "html":
      return new Response(
        `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <title>Status ${status.endpoint}</title>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background: #f5f5f5;
        color: #0f172a;
        font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }
      main {
        max-width: 32rem;
        margin: 0 auto;
        background: #fff;
        border-top: 0.5rem solid #154273;
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);
        padding: 1.5rem 2rem 2rem;
      }
      h1 {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.25rem;
        color: #154273;
      }
      .badge {
        display: inline-block;
        padding: 0.15rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        font-weight: bold;
        color: #fff;
        background: ${up ? "#39870c" : "#d52b1e"};
      }
      dl {
        margin: 1.5rem 0 0;
        border-top: 1px solid #e2e2e2;
      }
      dt, dd {
        padding: 0.5rem 0;
        margin: 0;
        border-bottom: 1px solid #e2e2e2;
      }
      dt {
        color: #666;
        font-size: 0.85rem;
      }
      dd {
        font-size: 1rem;
      }
      .warn {
        color: #e17000;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${status.endpoint} <span class="badge">${up ? "UP" : "DOWN"}</span></h1>
      <dl>
        <dt>URL</dt>
        <dd>${status.url}</dd>
        <dt>Reachable (/openapi.json)</dt>
        <dd><strong>${status.reachable.ok ? "yes" : "no"}</strong> (${status.reachable.statusCode})</dd>
        <dt>Authenticated (/apis)</dt>
        <dd><strong>${status.authenticated.ok ? "yes" : "no"}</strong> (${status.authenticated.statusCode})${status.authenticated.unauthorized ? ' — <span class="warn">unauthorized, check API_X_API_KEY</span>' : ""}</dd>
        <dt>Response time</dt>
        <dd>${status.responseTime}ms</dd>
        <dt>Checked at</dt>
        <dd>${status.checkedAt}</dd>
      </dl>
    </main>
  </body>
</html>
`,
        {
          status: up ? 200 : 503,
          headers: { "Content-Type": "text/html" },
        },
      );

    default:
      return new Response(
        `${status.endpoint}: ${up ? "UP" : "DOWN"}; reachable: ${status.reachable.ok ? "yes" : "no"} (${status.reachable.statusCode}), authenticated: ${status.authenticated.ok ? "yes" : "no"} (${status.authenticated.statusCode}${status.authenticated.unauthorized ? ", unauthorized" : ""}), ${status.responseTime}ms, checked at ${status.checkedAt}\n`,
        {
          status: up ? 200 : 503,
          headers: { "Content-Type": "text/plain" },
        },
      );
  }
};
