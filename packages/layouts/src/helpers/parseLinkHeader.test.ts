import { describe, expect, test } from "vitest";
import { parseLinkHeader } from "./parseLinkHeader";

test("parseLinkHeader() should parse relative URLs and ignore fragments", () => {
  expect(parseLinkHeader('</items?page=3#top>; rel="next"')).toEqual({
    next: {
      page: "3",
      rel: "next",
      url: "/items?page=3#top",
    },
  });
});

test("parseLinkHeader() should decode percent-encoded query parameters", () => {
  expect(
    parseLinkHeader(
      '<https://api.example.com/items?org=Kadaster%20NL>; rel="next"',
    ),
  ).toEqual({
    next: {
      org: "Kadaster NL",
      rel: "next",
      url: "https://api.example.com/items?org=Kadaster%20NL",
    },
  });
});

test("parseLinkHeader() should return repeated query parameters as an array", () => {
  expect(
    parseLinkHeader(
      '<https://api.example.com/items?tag=a&tag=b&tag=c&page=2>; rel="next"',
    ),
  ).toEqual({
    next: {
      tag: ["a", "b", "c"],
      page: "2",
      rel: "next",
      url: "https://api.example.com/items?tag=a&tag=b&tag=c&page=2",
    },
  });
});

test("parseLinkHeader() should return null for null or undefined input", () => {
  expect(parseLinkHeader(null)).toBeNull();
  expect(parseLinkHeader(undefined)).toBeNull();
});

test("parseLinkHeader() should return null when the header exceeds a custom maxLength", () => {
  const header = '<https://api.example.com/items?page=2>; rel="next"';

  expect(parseLinkHeader(header, { maxLength: 10 })).toBeNull();
});

test("parseLinkHeader() should throw when the header exceeds maxLength and throwOnMaxLengthExceeded is set", () => {
  const header = '<https://api.example.com/items?page=2>; rel="next"';

  expect(() =>
    parseLinkHeader(header, {
      maxLength: 10,
      throwOnMaxLengthExceeded: true,
    }),
  ).toThrow("Input string too long, it should be under 10 characters.");
});

/**
 * Tests ported from the original package to verify compatibility.
 * @see https://github.com/thlorenz/parse-link-header/blob/master/test/parse-link-header.js
 */
describe("parseLinkHeader() is compatible with parse-link-header", () => {
  const github = (query: string) =>
    `https://api.github.com/user/9287/repos?${query}`;

  test("parsing a proper link header with next and last", () => {
    expect(
      parseLinkHeader(
        `<${github("client_id=1&client_secret=2&page=2&per_page=100")}>; rel="next", ` +
          `<${github("client_id=1&client_secret=2&page=3&per_page=100")}>; rel="last"`,
      ),
    ).toEqual({
      next: {
        client_id: "1",
        client_secret: "2",
        page: "2",
        per_page: "100",
        rel: "next",
        url: github("client_id=1&client_secret=2&page=2&per_page=100"),
      },
      last: {
        client_id: "1",
        client_secret: "2",
        page: "3",
        per_page: "100",
        rel: "last",
        url: github("client_id=1&client_secret=2&page=3&per_page=100"),
      },
    });
  });

  test("handles unquoted relationships", () => {
    expect(
      parseLinkHeader(
        `<${github("client_id=1&client_secret=2&page=2&per_page=100")}>; rel=next, ` +
          `<${github("client_id=1&client_secret=2&page=3&per_page=100")}>; rel=last`,
      ),
    ).toEqual({
      next: {
        client_id: "1",
        client_secret: "2",
        page: "2",
        per_page: "100",
        rel: "next",
        url: github("client_id=1&client_secret=2&page=2&per_page=100"),
      },
      last: {
        client_id: "1",
        client_secret: "2",
        page: "3",
        per_page: "100",
        rel: "last",
        url: github("client_id=1&client_secret=2&page=3&per_page=100"),
      },
    });
  });

  test("parsing a proper link header with next, prev and last", () => {
    expect(
      parseLinkHeader(
        `<${github("page=3&per_page=100")}>; rel="next", ` +
          `<${github("page=1&per_page=100")}>; rel="prev", ` +
          `<${github("page=5&per_page=100")}>; rel="last"`,
      ),
    ).toEqual({
      next: {
        page: "3",
        per_page: "100",
        rel: "next",
        url: github("page=3&per_page=100"),
      },
      prev: {
        page: "1",
        per_page: "100",
        rel: "prev",
        url: github("page=1&per_page=100"),
      },
      last: {
        page: "5",
        per_page: "100",
        rel: "last",
        url: github("page=5&per_page=100"),
      },
    });
  });

  test("parsing an empty link header", () => {
    expect(parseLinkHeader("")).toBeNull();
  });

  test("parsing a proper link header with next and a link without rel", () => {
    expect(
      parseLinkHeader(
        `<${github("page=3&per_page=100")}>; rel="next", ` +
          `<${github("page=1&per_page=100")}>; pet="cat", `,
      ),
    ).toEqual({
      next: {
        page: "3",
        per_page: "100",
        rel: "next",
        url: github("page=3&per_page=100"),
      },
    });
  });

  test("parsing a proper link header with next and properties besides rel", () => {
    expect(
      parseLinkHeader(
        `<${github("page=3&per_page=100")}>; rel="next"; hello="world"; pet="cat"`,
      ),
    ).toEqual({
      next: {
        page: "3",
        per_page: "100",
        rel: "next",
        hello: "world",
        pet: "cat",
        url: github("page=3&per_page=100"),
      },
    });
  });

  test("parsing a proper link header with a comma in the url", () => {
    expect(
      parseLinkHeader(
        '<https://imaginary.url.notreal/?name=What,+me+worry>; rel="next";',
      ),
    ).toEqual({
      next: {
        rel: "next",
        name: "What, me worry",
        url: "https://imaginary.url.notreal/?name=What,+me+worry",
      },
    });
  });

  test("parsing a proper link header with a multi-word rel", () => {
    expect(
      parseLinkHeader(
        '<https://imaginary.url.notreal/?name=What,+me+worry>; rel="next page";',
      ),
    ).toEqual({
      page: {
        rel: "page",
        name: "What, me worry",
        url: "https://imaginary.url.notreal/?name=What,+me+worry",
      },
      next: {
        rel: "next",
        name: "What, me worry",
        url: "https://imaginary.url.notreal/?name=What,+me+worry",
      },
    });
  });

  test("parsing a proper link header with matrix parameters", () => {
    expect(
      parseLinkHeader(
        '<https://imaginary.url.notreal/segment;foo=bar;baz/item?name=What,+me+worry>; rel="next";',
      ),
    ).toEqual({
      next: {
        rel: "next",
        name: "What, me worry",
        url: "https://imaginary.url.notreal/segment;foo=bar;baz/item?name=What,+me+worry",
      },
    });
  });

  test("parsing an extremely long link header", () => {
    expect(parseLinkHeader(`; rel="${" ".repeat(10000)}",`)).toBeNull();
  });
});
