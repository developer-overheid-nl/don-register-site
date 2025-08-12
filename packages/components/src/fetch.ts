import { useMemo } from "react";

export function fetchAPI(resource: string, key?: string): Promise<Record<string, any> | { message: string }> {
  const options = key ? {
    headers: {
      'x-api-key': key,
    },
  } : undefined;
  return useMemo(() => fetch(`${resource}`, options).then(async (response) => {
    if (!response.ok) {
      return {
        message: `HTTP error! Status: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return data;
  }).catch((error) => {
    return { message: error.message };
  }), [resource, key]);
}
