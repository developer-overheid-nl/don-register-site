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

export const parseHeaders = (headers: Headers) => {
  const links = parseLinkHeader(headers.get("link"));

  const pagination = <paginationHeaders>{
    currentPage: Number(headers.get("current-page") || headers.get("x-current-page")),
    perPage: Number(headers.get("per-page") || headers.get("x-per-page")),
    totalCount: Number(headers.get("total-count") || headers.get("x-total-count")),
    totalPages: Number(headers.get("total-pages") || headers.get("x-total-pages")),
    ...links,
  };

  return pagination;
};

export const getPagination = (
  pagination: paginationHeaders | null | undefined,
  url: URL,
): PaginationProps => {
  if (!pagination) {
    return {
      links: [],
    };
  }

  const prev =
    pagination.prev !== undefined && pagination.last !== undefined
      ? new URL(
          `./${
            Number(pagination.prev.page) < pagination.totalPages
              ? pagination.prev.page
              : pagination.last.page
          }${decodeURIComponent(url.search)}`,
          url,
        ).toString()
      : undefined;
  const next =
    pagination.next !== undefined &&
    new URL(
      `./${pagination.next.page}${decodeURIComponent(url.search)}`,
      url,
    ).toString();

  const rangeBegin = (pagination.currentPage - 1) * pagination.perPage + 1;
  const rangeEnd = pagination.currentPage * pagination.perPage;

  return {
    links: [
      {
        href: new URL(
          `./${pagination.currentPage}${decodeURIComponent(url.search)}`,
          url,
        ).toString(),
        label: pagination.currentPage || 0,
        range: [
          rangeBegin,
          rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd,
        ],
      },
    ],
    current: 0,
    prev,
    next,
  };
};
