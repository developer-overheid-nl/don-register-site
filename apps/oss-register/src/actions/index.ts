import { ActionError, defineAction } from "astro:actions";
import {
  API_ENDPOINT,
  API_URL,
  API_VERSION,
  API_X_API_KEY,
} from "astro:env/server";
import { z } from "astro/zod";
import createClient from "openapi-fetch";
import { ApiPaths, type paths } from "../types/api-schema";

const FILTERS_RESOURCE = ApiPaths.listRepositoryFilters;

const client = createClient<paths>({
  baseUrl: `${API_URL}/${API_ENDPOINT}/${API_VERSION}`,
});

export const server = {
  getFilters: defineAction({
    accept: "form", // "json"
    input: z.any(),
    handler: async (input, _ctx) => {
      const queryObject: Record<string, string | string[]> = {};
      const searchParams = new URLSearchParams(input);

      for (const [key] of searchParams) {
        if (!Object.hasOwn(queryObject, key)) {
          const values: string | string[] = searchParams.getAll(key);
          queryObject[key] = values.length >= 2 ? values : values.join();
        }
      }

      delete queryObject._astroActionState; // Remove internal action state param if present

      const { data, error } = await client.GET(FILTERS_RESOURCE, {
        headers: {
          "x-api-key": API_X_API_KEY,
        },
        params: {
          query:
            queryObject as unknown as paths[typeof FILTERS_RESOURCE]["get"]["parameters"]["query"],
        },
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return data;
    },
  }),
};
