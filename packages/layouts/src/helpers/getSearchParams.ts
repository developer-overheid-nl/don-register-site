import type { APIContext } from "astro";

/**
 * Nested object from searchParams, save for duplicate keys
 *
 * @param {URLSearchParams} searchParams
 * @returns {Record<string, string | string[]>}
 */
export const searchParamsToObject = (searchParams: URLSearchParams) => {
  const queryObject: Record<string, string | string[]> = Object.create(null);

  for (const [key] of searchParams) {
    if (!Object.hasOwn(queryObject, key)) {
      const values: string | string[] = searchParams.getAll(key);
      queryObject[key] = values.length >= 2 ? values : values.join();
    }
  }

  return queryObject;
};

/**
 * Multidimensional array (or tuple) from searchParams, save for duplicate keys
 *
 * @param {URLSearchParams} searchParams
 * @returns {Array<[string, string]>}
 */
export const searchParamsToArray = (searchParams: URLSearchParams) => {
  const queryArray: Array<[string, string]> = Array.from(searchParams);

  return queryArray;
};

/** Key (string) or options to include or exclude keys */
type getSearchParamsKeyOrOptions =
  | string
  | {
      /** Exclude keys or key-value pairs */
      exclude?: Array<string | [string, string]>;
      /** Include keys; any keys in the exclude list will be ignored */
      include?: Array<string>;
    };

/**
 * Get search params from an URL
 *
 * @param {APIContext["url"]} url Url with the query params
 * @param {?getSearchParamsKeyOrOptions} [keyOrOptions] Key as string or options object
 * @param {'object'} [outputType] Type of the output, Object [*default*]
 * @returns {Record<string, string | string[]>}
 */
export function getSearchParams(
  url: APIContext["url"],
  keyOrOptions?: getSearchParamsKeyOrOptions,
  outputType?: "object",
): Record<string, string | string[]>;
/**
 * Get search params from an URL
 *
 * @param {APIContext["url"]} url Url with the query params
 * @param {?getSearchParamsKeyOrOptions} [keyOrOptions] Key as string or options object
 * @param {'array'} outputType Type of the output, multidimensional Array (Tuple)
 * @returns {Array<[string, string]>}
 */
export function getSearchParams(
  url: APIContext["url"],
  keyOrOptions: getSearchParamsKeyOrOptions | undefined,
  outputType: "array",
): Array<[string, string]>;
export function getSearchParams(
  url: APIContext["url"],
  keyOrOptions?: getSearchParamsKeyOrOptions,
  outputType: "object" | "array" = "object",
): Record<string, string | string[]> | Array<[string, string]> {
  const searchParams = new URLSearchParams(url.searchParams);

  if (typeof keyOrOptions === "string") {
    const newSearchParams = new URLSearchParams();

    for (const val of url.searchParams.getAll(keyOrOptions)) {
      newSearchParams.append(keyOrOptions, val);
    }

    return outputType === "array"
      ? searchParamsToArray(newSearchParams)
      : searchParamsToObject(newSearchParams);
  }

  if (keyOrOptions?.exclude !== undefined && keyOrOptions.exclude.length > 0) {
    for (const key of keyOrOptions.exclude) {
      if (typeof key === "string") {
        searchParams.delete(key);
      } else {
        searchParams.delete(key[0], key[1]);
      }
    }
  }

  if (keyOrOptions?.include !== undefined && keyOrOptions.include.length > 0) {
    const newSearchParams = new URLSearchParams();

    for (const key of keyOrOptions.include) {
      if (searchParams.has(key)) {
        for (const val of url.searchParams.getAll(key)) {
          newSearchParams.append(key, val);
        }
      }
    }

    return outputType === "array"
      ? searchParamsToArray(newSearchParams)
      : searchParamsToObject(newSearchParams);
  }

  return outputType === "array"
    ? searchParamsToArray(searchParams)
    : searchParamsToObject(searchParams);
}
