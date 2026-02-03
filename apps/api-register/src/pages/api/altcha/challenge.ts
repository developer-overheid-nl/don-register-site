import type { APIRoute } from "astro";
import { ALTCHA_HMAC_KEY } from "astro:env/server";
import { createChallenge } from "altcha-lib";

export const GET: APIRoute = async () => {
  const challenge = await createChallenge({
    hmacKey: ALTCHA_HMAC_KEY,
  });

  return new Response(JSON.stringify(challenge), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
};
