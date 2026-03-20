import type { APIContext } from "astro";

const searchParamsToObject = (
  searchParams: APIContext["url"]["searchParams"],
) => {
  const queryObject: Record<string, string | string[]> = {};

  for (const [key] of searchParams) {
    if (!Object.hasOwn(queryObject, key)) {
      const values: string | string[] = searchParams.getAll(key);
      queryObject[key] = values.length >= 2 ? values : values.join();
    }
  }

  return queryObject;
};

export const getRouting = (
  url: APIContext["url"],
  originPathname: APIContext["originPathname"],
  routePattern: APIContext["routePattern"],
  params: APIContext["params"],
) => {
  const patternItems = routePattern.split("/");
  const pathItems = url.pathname.split("/");

  const parentPath = pathItems
    .filter((item) => patternItems.includes(item))
    .join("/");

  return {
    url,
    pattern: {
      routePattern,
      patternItems,
      params,
    },
    path: {
      pathname: url.pathname,
      pathItems,
      parentPath,
      originPathname,
      rewrite: originPathname.replace(/\/$/, "") !== url.pathname,
    },
    /** @deprecated use queryObject */
    query: Object.fromEntries(url.searchParams),
    /** Nested object from searchParams, save for duplicate keys */
    queryObject: searchParamsToObject(url.searchParams),
  };
};
