import type { PaginationProps } from "@developer-overheid-nl/don-register-components";
import parseLinkHeader from "parse-link-header";

export interface paginationHeaders {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  self: parseLinkHeader.Link;
  first?: parseLinkHeader.Link;
  prev?: parseLinkHeader.Link;
  next?: parseLinkHeader.Link;
  last?: parseLinkHeader.Link;
}

/**
 * Helper function to parse pagination headers, uses `parseLinkHeader` and expects the following custom headers:
 * `current-page` or `x-current-page`
 * `per-page` or `x-per-page`
 * `total-count` or `x-total-count`
 * `total-pages` or `x-total-pages`
 * or it can parse these values from the `link` header if the appropriate rels are present (`self`, `first`, `prev`, `next`, `last`)
 * and the page and perPage keys are present in the link URLs (defaults to `page` and `perPage`, but can be customized via the `custom_keys` parameter).
 *
 * @param {Headers} headers Headers from http response
 * @param {{page: string, perPage: string}} custom_keys Object containing the current page and perPage values, used for parsing the link header (if present)
 * @returns {paginationHeaders}
 */
export const parseHeaders = (
  headers: Headers,
  {
    page = "page",
    perPage = "perPage",
  }: {
    page?: string;
    perPage?: string;
  } = { page: "page", perPage: "perPage" },
) => {
  let links = parseLinkHeader(headers.get("link"));

  if (links?.first) {
    links.first.page = links.first[page];
    links.first.perPage = links.first[perPage];
  }

  if (links?.prev) {
    links.prev.page = links.prev[page];
    links.prev.perPage = links.prev[perPage];
  }

  if (links?.self) {
    links.self.page = links.self[page];
    links.self.perPage = links.self[perPage];
  }

  if (links?.next) {
    links.next.page = links.next[page];
    links.next.perPage = links.next[perPage];
  }

  if (links?.last) {
    links.last.page = links.last[page];
    links.last.perPage = links.last[perPage];
  }

  if (links === null) {
    links = {
      self: {
        page:
          headers.get("current-page") || headers.get("x-current-page") || "1",
        url: "",
        rel: "self",
      },
    };
  }

  const pagination = <paginationHeaders>{
    currentPage:
      Number(
        headers.get("current-page") ||
          headers.get("x-current-page") ||
          links?.self?.page ||
          Number(links?.prev?.page) + 1 ||
          Number(links?.next?.page) - 1,
      ) || 0,
    perPage:
      Number(
        headers.get("per-page") ||
          headers.get("x-per-page") ||
          links?.first?.perPage ||
          headers.get("total-count") ||
          headers.get("x-total-count"),
      ) || 0,
    totalCount:
      Number(headers.get("total-count") || headers.get("x-total-count")) || 0,
    totalPages:
      Number(
        headers.get("total-pages") ||
          headers.get("x-total-pages") ||
          links?.self?.page ||
          links?.last?.page,
      ) || 0,
    ...links,
  };

  return pagination;
};

/**
 * Helper function to convert pagination headers to PaginationProps for the Pagination component.
 *
 * @param {(paginationHeaders | null | undefined)} pagination parsed pagination headers (@see parseHeaders)
 * @param {URL} url Base URL where the page links are constructed from.
 * @param {number} [affixedLinks=0] Number of page links to show on either side of the current page.
 * @returns {PaginationProps}
 */
export const getPagination = (
  pagination: paginationHeaders | null | undefined,
  url: URL,
  affixedLinks: number = 0,
): PaginationProps => {
  if (!pagination) {
    return {
      links: [],
    };
  }

  const prev =
    pagination.prev !== undefined && pagination.currentPage > 1
      ? {
          href: new URL(
            `./${
              Number(pagination.prev.page) < pagination.totalPages
                ? pagination.prev.page
                : pagination.last?.page
            }${url.search}`,
            url,
          ).toString(),
          label: Number(pagination.prev.page),
        }
      : false;
  const next =
    pagination.next !== undefined &&
    pagination.currentPage <= pagination.totalPages - 1
      ? {
          href: new URL(
            `./${pagination.next.page}${url.search}`,
            url,
          ).toString(),
          label: Number(pagination.next.page),
        }
      : false;

  const first =
    pagination.first !== undefined && pagination.currentPage !== 1
      ? {
          href: new URL(
            `./${pagination.first.page}${url.search}`,
            url,
          ).toString(),
          label: 1,
        }
      : false;
  const last =
    pagination.last !== undefined &&
    pagination.currentPage !== pagination.totalPages
      ? {
          href: new URL(
            `./${pagination.last.page}${url.search}`,
            url,
          ).toString(),
          label: pagination.totalPages,
        }
      : false;

  const ellipsisBefore = first && pagination.currentPage > affixedLinks + 2; // +2 because we want to show at least one page number between the first page and the ellipsis
  const ellipsisAfter =
    last && pagination.currentPage < pagination.totalPages - affixedLinks - 1; // -1 because we want to show at least one page number between the last page and the ellipsis

  const rangeBegin = (pagination.currentPage - 1) * pagination.perPage + 1;
  const rangeEnd = pagination.currentPage * pagination.perPage;

  const links: PaginationProps["links"] = [];

  for (
    let i = pagination.currentPage - affixedLinks;
    i <= pagination.currentPage + affixedLinks;
    i++
  ) {
    if (i !== pagination.currentPage && i > 1 && i < pagination.totalPages) {
      links.push({
        href: new URL(`./${i}${url.search}`, url).toString(),
        label: i,
        current: false,
      });
    } else if (i === pagination.currentPage) {
      links.push({
        href: new URL(
          `./${pagination.currentPage}${url.search}`,
          url,
        ).toString(),
        label: pagination.currentPage || 0,
        current: true,
        range: [
          rangeBegin,
          rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd,
        ],
      });
    }
  }

  return {
    links,
    first,
    prev,
    ellipsisBefore,
    current: pagination.currentPage,
    ellipsisAfter,
    next,
    last,
  };
};
