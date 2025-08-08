import { useMemo } from "react";

export function fetchAPI(
  resource: string,
  key: string
): Promise<Record<string, any> | { message: string }> {
  return useMemo(
    () =>
      fetch(`${resource}`, {
        headers: {
          "x-api-key": key,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            return {
              message: `HTTP error! Status: ${response.status} ${response.statusText}`,
            };
          }

          const data = await response.json();
          return data;
        })
        .catch((error) => {
          console.error("fetchAPI failed:", error);
          return { apis: [] };
        }),
    [resource, key]
  );
}
