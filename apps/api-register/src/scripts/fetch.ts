// import { API_URL, API_ENDPOINT, API_VERSION } from "astro:env/client";

export async function fetchAPI(resource: string, key: string): Promise<JSON | { message: string }> {
  //return await fetch(`${API_URL}/${API_ENDPOINT}/${API_VERSION}/${resource}`, {
  return await fetch(`${resource}`, {
    headers: {
      'x-api-key': key,
    },
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      return {
        message: `HTTP error! Status: ${response.status} ${response.statusText}`,
      };
    }

    return response.json();
  }).catch((error) => {
    return { message: error.message };
  });
}
