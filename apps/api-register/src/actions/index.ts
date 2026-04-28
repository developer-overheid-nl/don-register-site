import { ActionError, defineAction } from "astro:actions";
import {
  ALTCHA_HMAC_KEY,
  API_ENDPOINT,
  API_URL,
  API_VERSION,
  API_X_API_KEY,
  TOOLS_ENDPOINT,
} from "astro:env/server";
import { verifySolution } from "altcha-lib";
import { z } from "astro/zod";
import { t } from "i18next";
import createClient from "openapi-fetch";
import { ApiPaths, type paths as apiPaths } from "../types/api-schema";
import type { paths as toolPaths } from "../types/tools-schema";

const CLIENTS_RESOURCE: keyof toolPaths = `/${API_VERSION}/auth/clients`;
const FILTERS_RESOURCE = ApiPaths.listApiFilters;

const toolsClient = createClient<toolPaths>({
  baseUrl: `${API_URL}/${TOOLS_ENDPOINT}`,
});

const apiClient = createClient<apiPaths>({
  baseUrl: `${API_URL}/${API_ENDPOINT}/${API_VERSION}`,
});

export const server = {
  getFilters: defineAction({
    accept: "form",
    input: z.any(),
    handler: async (input) => {
      const queryObject: Record<string, string | string[]> = {};
      const searchParams = new URLSearchParams(input);

      for (const [key] of searchParams) {
        if (!Object.hasOwn(queryObject, key)) {
          const values: string | string[] = searchParams.getAll(key);
          queryObject[key] = values.length >= 2 ? values : values.join();
        }
      }

      delete queryObject._astroActionState;

      const { data, error } = await apiClient.GET(FILTERS_RESOURCE, {
        headers: {
          "x-api-key": API_X_API_KEY,
        },
        params: {
          query:
            queryObject as unknown as apiPaths[typeof FILTERS_RESOURCE]["get"]["parameters"]["query"],
        },
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          // biome-ignore lint/suspicious/noExplicitAny: oas needs update
          message: `${t("actions.error-server")} — ${(error as any).detail || (error as any).error_msg || t("actions.error-unknown")}`,
          stack: JSON.stringify(error),
        });
      }

      return data;
    },
  }),
  keyRequest: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(t("actions.error-invalid-email")),
      altcha: z.string().min(1, t("actions.error-captcha-missing")),
    }),
    handler: async (input) => {
      // Verify the altcha captcha solution
      const altchaValid = await verifySolution(input.altcha, ALTCHA_HMAC_KEY);
      if (!altchaValid) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: t("actions.error-captcha-invalid"),
        });
      }

      // Post the email to the backend to generate an API key
      const { data, error } = await toolsClient.POST(CLIENTS_RESOURCE, {
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
          message: `${t("actions.error-request-key")} — ${(error as any).detail || t("actions.error-unknown")}`,
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
