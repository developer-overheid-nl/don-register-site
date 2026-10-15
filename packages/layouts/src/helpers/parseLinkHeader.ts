/**
 * A single parsed link from a `Link` header. Contains the link `url`, its `rel`,
 * any other link parameters (e.g. `title`, `type`) and all query parameters of the link URL.
 * Query parameters that appear more than once are returned as an array.
 */
export interface Link {
  url: string;
  rel: string;
  [queryParam: string]: string | string[] | undefined;
}

/**
 * Parsed `Link` header, keyed by `rel`.
 */
export interface Links {
  [rel: string]: Link | undefined;
}

export interface ParseLinkHeaderOptions {
  /** Maximum length of the header, longer headers are ignored (or throw, see `throwOnMaxLengthExceeded`). Defaults to `2000`. */
  maxLength?: number;
  /** Throw an error instead of returning `null` when the header exceeds `maxLength`. Defaults to `false`. */
  throwOnMaxLengthExceeded?: boolean;
}

const parseQuery = (linkUrl: string): Record<string, string | string[]> => {
  const queryStart = linkUrl.indexOf("?");

  if (queryStart === -1) {
    return {};
  }

  const [search] = linkUrl.slice(queryStart + 1).split("#");
  const query: Record<string, string | string[]> = {};

  for (const [key, value] of new URLSearchParams(search)) {
    const existing = query[key];

    query[key] =
      existing === undefined
        ? value
        : [...(Array.isArray(existing) ? existing : [existing]), value];
  }

  return query;
};

const parseLink = (link: string): Partial<Link> | null => {
  const match = link.match(/<?([^>]*)>(.*)/);

  if (!match) {
    return null;
  }

  const [, linkUrl = "", rest = ""] = match;
  const params: Record<string, string> = {};

  for (const part of rest.split(";").slice(1)) {
    // rel="next" => 1: rel 2: next
    const [, key, value] = part.match(/\s*(.+)\s*=\s*"?([^"]+)"?/) ?? [];

    if (key && value) {
      params[key] = value;
    }
  }

  return {
    ...parseQuery(linkUrl),
    ...params,
    url: linkUrl,
  };
};

/**
 * Parses a `Link` header (RFC 8288) into an object keyed by `rel`.
 * TypeScript port of [parse-link-header](https://www.npmjs.com/package/parse-link-header) without Node's `url` and `querystring` modules.
 *
 * @example
 * parseLinkHeader('<https://api.example.com/items?page=2>; rel="next"');
 * // { next: { page: "2", rel: "next", url: "https://api.example.com/items?page=2" } }
 *
 * @param {(string | null | undefined)} linkHeader Value of the `Link` header
 * @param {ParseLinkHeaderOptions} options
 * @returns {(Links | null)} Parsed links, or `null` when the header is empty or too long
 */
export const parseLinkHeader = (
  linkHeader: string | null | undefined,
  {
    maxLength = 2000,
    throwOnMaxLengthExceeded = false,
  }: ParseLinkHeaderOptions = {},
): Links | null => {
  if (!linkHeader) {
    return null;
  }

  if (linkHeader.length > maxLength) {
    if (throwOnMaxLengthExceeded) {
      throw new Error(
        `Input string too long, it should be under ${maxLength} characters.`,
      );
    }

    return null;
  }

  const links: Links = {};

  for (const link of linkHeader.split(/,\s*</)) {
    const parsed = parseLink(link);

    if (!parsed?.rel) {
      continue;
    }

    for (const rel of parsed.rel.split(/\s+/)) {
      links[rel] = { ...parsed, url: parsed.url ?? "", rel };
    }
  }

  return links;
};
