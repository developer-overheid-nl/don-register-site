/* DEPRECATED */

import { useMemo } from "react";
import parseLinkHeader from "parse-link-header";

export interface paginationHeaders {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  self: parseLinkHeader.Link;
  prev?: parseLinkHeader.Link;
  next?: parseLinkHeader.Link;
}

export interface apiResponse<T> {
  data: T | { message: string };
  headers: { pagination: paginationHeaders | null};
}

export function fetchAPI<T>(resource: string, key?: string): Promise<apiResponse<T>> {
  const options = key ? {
    headers: {
      'x-api-key': key,
    },
  } : undefined;
  return /*useMemo(() =>*/ fetch(`${resource}`, options).then(async (response) => {
    const { headers } = response;

    const links = parseLinkHeader(headers.get('link'));

    const pagination = <paginationHeaders>{
      currentPage: Number(headers.get('x-current-page')),
      perPage: Number(headers.get('x-per-page')),
      totalCount: Number(headers.get('x-total-count')),
      totalPages: Number(headers.get('x-total-pages')),
      ...links,
    }


    if (!response.ok) {
      return {
        data: {
          message: `HTTP error! Status: ${response.status} ${response.statusText}`,
        },
        headers: {
          pagination
        },
      };
    }

    const data = await response.json();

    return {
      data, 
      headers: {
        pagination,
      }
    };
  }).catch((error) => {
    return {data: { message: error.message }, headers: { pagination: null }};
  })/*, [resource, key])*/;
}

export function fetchHook (resource: string, key?: string): Promise<apiResponse> {
  return useMemo(() => fetchAPI(resource, key), [resource, key]);
}