import {
  API_ENDPOINT,
  API_URL,
  API_VERSION,
  API_X_API_KEY,
} from "astro:env/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  let { version } = params;

  const DEFAULT_VERSION = "3.1.json";
  // const DEFAULT_TYPE = "json";
  const availableVersions = ["3.0.json", "3.1.json", "3.0.yaml", "3.1.yaml"];
  // const availableTypes = ["json", "yaml"];

  version =
    version && availableVersions.includes(version) ? version : DEFAULT_VERSION;

  const type = version.substring(version.lastIndexOf(".") + 1);

  const response = await fetch(
    `${API_URL}/${API_ENDPOINT}/${API_VERSION}/apis/${id}/oas/${version}`,
    {
      headers: API_X_API_KEY ? { "x-api-key": API_X_API_KEY } : {},
    },
  );

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": `application/${type}`,
      // 'Content-Disposition': `attachment; filename="${id}_oas${version}.json"`,
    },
  });
};
