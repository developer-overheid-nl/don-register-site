import { ALTCHA_HMAC_KEY } from "astro:env/server";
import { createChallenge } from "altcha-lib";
import { deriveKey } from "altcha-lib/algorithms/pbkdf2";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const challenge = await createChallenge({
    algorithm: "PBKDF2/SHA-256",
    cost: 5000,
    deriveKey,
    hmacSignatureSecret: ALTCHA_HMAC_KEY,
  });

  return new Response(JSON.stringify(challenge), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
};
