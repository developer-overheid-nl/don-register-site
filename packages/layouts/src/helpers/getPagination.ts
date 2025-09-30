import parseLinkHeader from "parse-link-header";
import { type PaginationProps } from "@developer-overheid-nl/don-register-components";

export interface paginationHeaders {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  self: parseLinkHeader.Link;
  prev?: parseLinkHeader.Link;
  next?: parseLinkHeader.Link;
}

export const parseHeaders = (headers: Headers) => {
  const links = parseLinkHeader(headers.get('link'));

  const pagination = <paginationHeaders>{
    currentPage: Number(headers.get('x-current-page')),
    perPage: Number(headers.get('x-per-page')),
    totalCount: Number(headers.get('x-total-count')),
    totalPages: Number(headers.get('x-total-pages')),
    ...links,
  }

  return pagination;
}

export const getPagination = (pagination: paginationHeaders | null | undefined, url: URL): PaginationProps => {
  // const {self, next, prev} = links;

  // const selfParts = getUrlParts(self.href);
  // const nextParts = getUrlParts(next?.href);
  // const prevParts = getUrlParts(prev?.href);

  // const resultsBegin = selfParts && selfParts?.page - 1 * selfParts?.perPage;
  // const resultsEnd = selfParts && selfParts?.page * selfParts?.perPage;
  // const range = 
  // console.log({self, next, prev}, {selfParts, nextParts, prevParts}, {resultsBegin, resultsEnd});

  if (!pagination) {
    return {
      links: []
    }
  }

  // console.log(pagination)

  // TODO: make them self from links header
  const prev = pagination.prev !== undefined && new URL(`./${pagination.prev.page}${decodeURIComponent(url.search)}`, url).toString();
  const next = pagination.next !== undefined && new URL(`./${pagination.next.page}${decodeURIComponent(url.search)}`, url).toString();

  const rangeBegin = (pagination.currentPage -1) * pagination.perPage + 1;
  const rangeEnd = pagination.currentPage * pagination.perPage;

  return {
    links: [{
      href: new URL(`./${pagination.currentPage}${decodeURIComponent(url.search)}`, url).toString(), 
      label: pagination.currentPage || 0, 
      range: [rangeBegin, rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd],
    }], 
    current: 0, 
    prev, 
    next
  }
}
