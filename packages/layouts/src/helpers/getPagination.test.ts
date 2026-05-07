import { expect, test } from "vitest";
import { getPagination, parseHeaders } from "./getPagination";

const defaultHeaders = {
  "current-page": "1",
  "per-page": "10",
  "total-count": "420",
  "total-pages": "42",
  link: '<https://api.example.com/items?page=2&perPage=10>; rel="next", <https://api.example.com/items?page=42&perPage=10>; rel="last"',
};

test("parseHeaders() should parse pagination headers correctly, first page", () => {
  const headers = new Headers(defaultHeaders);

  expect(parseHeaders(headers)).toEqual({
    currentPage: 1,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    next: {
      page: "2",
      perPage: "10",
      rel: "next",
      url: "https://api.example.com/items?page=2&perPage=10",
    },
    last: {
      page: "42",
      perPage: "10",
      rel: "last",
      url: "https://api.example.com/items?page=42&perPage=10",
    },
  });
});

test("parseHeaders() should parse pagination headers correctly, page 2", () => {
  const headers = new Headers(defaultHeaders);
  headers.set("current-page", "2");
  headers.set(
    "link",
    '<https://api.example.com/items?page=1>; rel="prev", <https://api.example.com/items?page=3>; rel="next", <https://api.example.com/items?page=42>; rel="last"',
  );

  expect(parseHeaders(headers)).toEqual({
    currentPage: 2,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    prev: {
      page: "1",
      rel: "prev",
      url: "https://api.example.com/items?page=1",
    },
    next: {
      page: "3",
      rel: "next",
      url: "https://api.example.com/items?page=3",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  });
});

test("parseHeaders() should parse pagination headers correctly, page 2 (x-* headers)", () => {
  const headers = new Headers();
  headers.set("x-current-page", "2");
  headers.set("x-per-page", "10");
  headers.set("x-total-count", "420");
  headers.set("x-total-pages", "42");
  headers.set(
    "link",
    '<https://api.example.com/items?page=1>; rel="prev", <https://api.example.com/items?page=3>; rel="next", <https://api.example.com/items?page=42>; rel="last"',
  );

  expect(parseHeaders(headers)).toEqual({
    currentPage: 2,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    prev: {
      page: "1",
      rel: "prev",
      url: "https://api.example.com/items?page=1",
    },
    next: {
      page: "3",
      rel: "next",
      url: "https://api.example.com/items?page=3",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  });
});

test("parseHeaders() should parse pagination headers correctly, last page", () => {
  const headers = new Headers();
  headers.set("current-page", "42");
  headers.set("per-page", "10");
  headers.set("total-count", "420");
  headers.set("total-pages", "42");
  headers.set(
    "link",
    '<https://api.example.com/items?page=41>; rel="prev", <https://api.example.com/items?page=1>; rel="first"',
  );

  expect(parseHeaders(headers)).toEqual({
    currentPage: 42,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    prev: {
      page: "41",
      rel: "prev",
      url: "https://api.example.com/items?page=41",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
  });
});

test("parseHeaders() should return default values when headers are missing", () => {
  const headers = new Headers();

  expect(parseHeaders(headers)).toEqual({
    currentPage: 0,
    perPage: 0,
    totalCount: 0,
    totalPages: 0,
  });
});

test("parseHeaders() should return default values when some headers are missing, but we have a x-total-count and link; keys not set", () => {
  const headers = new Headers();
  headers.set("x-total-count", "26");
  headers.set(
    "link",
    '<http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=1&_per_page=10>; rel="first", <http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=2&_per_page=10>; rel="next", <http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=3&_per_page=10>; rel="last"',
  );

  expect(parseHeaders(headers)).toEqual({
    currentPage: 0,
    perPage: 0,
    totalCount: 26,
    totalPages: 0,
    first: {
      _page: "1",
      _per_page: "10",
      rel: "first",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=1&_per_page=10",
    },
    last: {
      _page: "3",
      _per_page: "10",
      rel: "last",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=3&_per_page=10",
    },
    next: {
      _page: "2",
      _per_page: "10",
      rel: "next",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=2&_per_page=10",
    },
  });
});

test("parseHeaders() should return default values when some headers are missing, but we have a x-total-count and link; custom keys set", () => {
  const headers = new Headers();
  headers.set("x-total-count", "26");
  headers.set(
    "link",
    '<http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=1&_per_page=10>; rel="first", <http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=2&_per_page=10>; rel="next", <http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=3&_per_page=10>; rel="last"',
  );

  expect(
    parseHeaders(headers, { page: "_page", perPage: "_per_page" }),
  ).toEqual({
    currentPage: 1,
    perPage: 10,
    totalCount: 26,
    totalPages: 3,
    first: {
      _page: "1",
      _per_page: "10",
      page: "1",
      perPage: "10",
      rel: "first",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=1&_per_page=10",
    },
    last: {
      _page: "3",
      _per_page: "10",
      page: "3",
      perPage: "10",
      rel: "last",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=3&_per_page=10",
    },
    next: {
      _page: "2",
      _per_page: "10",
      page: "2",
      perPage: "10",
      rel: "next",
      url: "http://my-json-server.typicode.com/developer-overheid-nl/dingen-api/things?_page=2&_per_page=10",
    },
  });
});

test("getPagination() should return correct pagination links and range, first page", () => {
  const pagination = {
    currentPage: 1,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "1",
      rel: "self",
      url: "https://api.example.com/items?page=1",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    next: {
      page: "2",
      rel: "next",
      url: "https://api.example.com/items?page=2",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url)).toEqual({
    links: [
      {
        href: "https://api.example.com/1",
        label: 1,
        range: [1, 10],
        current: true,
      },
    ],
    first: false,
    prev: false,
    ellipsisBefore: false,
    current: 1,
    ellipsisAfter: true,
    next: {
      href: "https://api.example.com/2",
      label: 2,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, page 2", () => {
  const pagination = {
    currentPage: 2,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "2",
      rel: "self",
      url: "https://api.example.com/items?page=2",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "1",
      rel: "prev",
      url: "https://api.example.com/items?page=1",
    },
    next: {
      page: "3",
      rel: "next",
      url: "https://api.example.com/items?page=3",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url)).toEqual({
    links: [
      {
        href: "https://api.example.com/2",
        label: 2,
        range: [11, 20],
        current: true,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: false,
    ellipsisBefore: false,
    current: 2,
    ellipsisAfter: true,
    next: {
      href: "https://api.example.com/3",
      label: 3,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, page 3", () => {
  const pagination = {
    currentPage: 3,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "3",
      rel: "self",
      url: "https://api.example.com/items?page=3",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "2",
      rel: "prev",
      url: "https://api.example.com/items?page=2",
    },
    next: {
      page: "4",
      rel: "next",
      url: "https://api.example.com/items?page=4",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url)).toEqual({
    links: [
      {
        href: "https://api.example.com/3",
        label: 3,
        range: [21, 30],
        current: true,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/2",
      label: 2,
    },
    ellipsisBefore: true,
    current: 3,
    ellipsisAfter: true,
    next: {
      href: "https://api.example.com/4",
      label: 4,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, last page -1", () => {
  const pagination = {
    currentPage: 41,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "41",
      rel: "self",
      url: "https://api.example.com/items?page=41",
    },
    prev: {
      page: "40",
      rel: "prev",
      url: "https://api.example.com/items?page=40",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url)).toEqual({
    links: [
      {
        href: "https://api.example.com/41",
        label: 41,
        range: [401, 410],
        current: true,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/40",
      label: 40,
    },
    ellipsisBefore: true,
    current: 41,
    ellipsisAfter: false,
    next: false,
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, last page", () => {
  const pagination = {
    currentPage: 42,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "42",
      rel: "self",
      url: "https://api.example.com/items?page=42",
    },
    prev: {
      page: "41",
      rel: "prev",
      url: "https://api.example.com/items?page=41",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url)).toEqual({
    links: [
      {
        href: "https://api.example.com/42",
        label: 42,
        range: [411, 420],
        current: true,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/41",
      label: 41,
    },
    ellipsisBefore: true,
    current: 42,
    ellipsisAfter: false,
    next: false,
    last: false,
  });
});

test("getPagination() should return correct pagination links and range, page 15; 3 links", () => {
  const pagination = {
    currentPage: 15,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "15",
      rel: "self",
      url: "https://api.example.com/items?page=15",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "14",
      rel: "prev",
      url: "https://api.example.com/items?page=14",
    },
    next: {
      page: "16",
      rel: "next",
      url: "https://api.example.com/items?page=16",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url, 1)).toEqual({
    links: [
      {
        href: "https://api.example.com/14",
        label: 14,
        current: false,
      },
      {
        href: "https://api.example.com/15",
        label: 15,
        range: [141, 150],
        current: true,
      },
      {
        href: "https://api.example.com/16",
        label: 16,
        current: false,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/14",
      label: 14,
    },
    ellipsisBefore: true,
    current: 15,
    ellipsisAfter: true,
    next: {
      href: "https://api.example.com/16",
      label: 16,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, page 15; 5 links", () => {
  const pagination = {
    currentPage: 15,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "15",
      rel: "self",
      url: "https://api.example.com/items?page=15",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "14",
      rel: "prev",
      url: "https://api.example.com/items?page=14",
    },
    next: {
      page: "16",
      rel: "next",
      url: "https://api.example.com/items?page=16",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url, 2)).toEqual({
    links: [
      {
        href: "https://api.example.com/13",
        label: 13,
        current: false,
      },
      {
        href: "https://api.example.com/14",
        label: 14,
        current: false,
      },
      {
        href: "https://api.example.com/15",
        label: 15,
        range: [141, 150],
        current: true,
      },
      {
        href: "https://api.example.com/16",
        label: 16,
        current: false,
      },
      {
        href: "https://api.example.com/17",
        label: 17,
        current: false,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/14",
      label: 14,
    },
    ellipsisBefore: true,
    current: 15,
    ellipsisAfter: true,
    next: {
      href: "https://api.example.com/16",
      label: 16,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, page 40; 5 links", () => {
  const pagination = {
    currentPage: 40,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "40",
      rel: "self",
      url: "https://api.example.com/items?page=40",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "39",
      rel: "prev",
      url: "https://api.example.com/items?page=39",
    },
    next: {
      page: "41",
      rel: "next",
      url: "https://api.example.com/items?page=41",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url, 2)).toEqual({
    links: [
      {
        href: "https://api.example.com/38",
        label: 38,
        current: false,
      },
      {
        href: "https://api.example.com/39",
        label: 39,
        current: false,
      },
      {
        href: "https://api.example.com/40",
        label: 40,
        range: [391, 400],
        current: true,
      },
      {
        href: "https://api.example.com/41",
        label: 41,
        current: false,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/39",
      label: 39,
    },
    ellipsisBefore: true,
    current: 40,
    ellipsisAfter: false,
    next: {
      href: "https://api.example.com/41",
      label: 41,
    },
    last: {
      href: "https://api.example.com/42",
      label: 42,
    },
  });
});

test("getPagination() should return correct pagination links and range, last page; 5 links", () => {
  const pagination = {
    currentPage: 42,
    perPage: 10,
    totalCount: 420,
    totalPages: 42,
    self: {
      page: "42",
      rel: "self",
      url: "https://api.example.com/items?page=42",
    },
    first: {
      page: "1",
      rel: "first",
      url: "https://api.example.com/items?page=1",
    },
    prev: {
      page: "41",
      rel: "prev",
      url: "https://api.example.com/items?page=41",
    },
    next: {
      page: "41",
      rel: "next",
      url: "https://api.example.com/items?page=41",
    },
    last: {
      page: "42",
      rel: "last",
      url: "https://api.example.com/items?page=42",
    },
  };
  const url = new URL("https://api.example.com/items");

  expect(getPagination(pagination, url, 2)).toEqual({
    links: [
      {
        href: "https://api.example.com/40",
        label: 40,
        current: false,
      },
      {
        href: "https://api.example.com/41",
        label: 41,
        current: false,
      },
      {
        href: "https://api.example.com/42",
        label: 42,
        range: [411, 420],
        current: true,
      },
    ],
    first: {
      href: "https://api.example.com/1",
      label: 1,
    },
    prev: {
      href: "https://api.example.com/41",
      label: 41,
    },
    ellipsisBefore: true,
    current: 42,
    ellipsisAfter: false,
    next: false,
    last: false,
  });
});

test("getPagination() should return empty links when pagination is null", () => {
  const url = new URL("https://api.example.com/items");
  expect(getPagination(null, url)).toEqual({
    links: [],
  });
});

test("getPagination() should return empty links when pagination is undefined", () => {
  const url = new URL("https://api.example.com/items");
  expect(getPagination(undefined, url)).toEqual({
    links: [],
  });
});
