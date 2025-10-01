import type { APIRoute } from 'astro';
import { API_URL, API_ENDPOINT, API_VERSION, API_X_API_KEY } from "astro:env/server";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  const response = await fetch(
    `${API_URL}/${API_ENDPOINT}/${API_VERSION}/apis/${id}/bruno`,
    {
      headers: API_X_API_KEY
        ? { 'x-api-key': API_X_API_KEY }
        : {}
    }
  );

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${id}_bruno-collection.zip"`,
    }
  });
};
