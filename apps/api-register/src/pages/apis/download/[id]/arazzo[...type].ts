import {
  API_ENDPOINT,
  API_URL,
  API_VERSION,
  API_X_API_KEY,
} from "astro:env/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  let { type } = params;

  const DEFAULT_VERSION = "markdown";
  const availableTypes = ["markdown", "mermaid"];
  const mimeTypes: Record<string, string> = {
    markdown: "text/markdown",
    mermaid: "text/vnd.mermaid",
  };
  const extensions: Record<string, string> = {
    markdown: "md",
    mermaid: "mmd",
  };

  type =
    type && availableTypes.includes(type) ? type : DEFAULT_VERSION;

  const response = await fetch(
    `${API_URL}/${API_ENDPOINT}/${API_VERSION}/apis/${id}/oas/${type}`,
    {
      headers: API_X_API_KEY ? { "x-api-key": API_X_API_KEY } : {},
    },
  );

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": `text/${mimeTypes[type]}`,
      'Content-Disposition': `attachment; filename="${id}_arazzo-${type}.${extensions[type]}"`,
    },
  });
};
