export async function fetchAPI(
  resource: string,
  key: string
): Promise<Record<string, any> | { message: string }> {
  try {
    const response = await fetch(resource, {
      headers: { "x-api-key": key },
    });

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status} ${response.statusText}`);
      return {
        apis: []
      };
    }

    return await response.json();
  } catch (error) {
    console.error("fetchAPI failed:", error);
    return { apis: [] };
  }
}