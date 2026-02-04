import { ActionError, defineAction } from "astro:actions";
import {
  API_URL,
  API_VERSION,
  API_X_API_KEY,
  TOOLS_ENDPOINT,
} from "astro:env/server";
import { z } from "astro/zod";
import createClient from "openapi-fetch";
import type { paths } from "../types/tools-schema";

const CLIENTS_RESOURCE: keyof paths = `/${API_VERSION}/auth/clients`;

const client = createClient<paths>({
  baseUrl: `${API_URL}/${TOOLS_ENDPOINT}`,
});

export const server = {
  keyRequest: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
    }),
    handler: async (input) => {
      // Post the email to the backend to generate an API key
      const { data, error } = await client.POST(CLIENTS_RESOURCE, {
        body: {
          email: input.email,
        },
        headers: {
          "x-api-key": API_X_API_KEY,
        },
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          // biome-ignore lint/suspicious/noExplicitAny: oas needs update
          message: `T:Er is een fout opgetreden bij het aanvragen van de API-sleutel. ${(error as any).detail || "T:Onbekende fout"}`,
          stack: JSON.stringify(error),
        });
      }

      return {
        key: data?.apiKey || "",
        email: input.email,
      };
    },
  }),
};
