import type { APIRoute } from "astro";
import {
  API_URL,
  API_ENDPOINT,
  API_VERSION,
  API_X_API_KEY,
} from "astro:env/server";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  let { version } = params;

  const DEFAULT_VERSION = "31";
  const availableVersions = ["30", "31"];

  version =
    version && availableVersions.includes(version) ? version : DEFAULT_VERSION;

  const response = await fetch(
    `${API_URL}/${API_ENDPOINT}/${API_VERSION}/apis/${id}/oas${version}`,
    {
      headers: API_X_API_KEY ? { "x-api-key": API_X_API_KEY } : {},
    },
  );

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Disposition': `attachment; filename="${id}_oas${version}.json"`,
    },
  });
};
