import { expect, test } from "vitest";
import { getRouting } from "./getRouting";

test("getRouting() should build pattern, path and query info for a dynamic route", () => {
  const url = new URL("https://example.com/register/123?foo=bar");
  const params = { id: "123" };

  const routing = getRouting(url, "/register/123", "/register/[id]", params);

  expect(routing.url).toBe(url);
  expect(routing.pattern).toEqual({
    routePattern: "/register/[id]",
    patternItems: ["", "register", "[id]"],
    params,
  });
  expect(routing.path).toEqual({
    pathname: "/register/123",
    pathItems: ["", "register", "123"],
    parentPath: "/register",
    originPathname: "/register/123",
    rewrite: false,
  });
  expect(routing.query).toEqual({ foo: "bar" });
  expect(routing.queryObject).toEqual({ foo: "bar" });
});

test("getRouting() should compute the parent path from the static segments of the pattern", () => {
  const url = new URL("https://example.com/register/123/edit");

  const routing = getRouting(url, "/register/123/edit", "/register/[id]/edit", {
    id: "123",
  });

  expect(routing.path.pathItems).toEqual(["", "register", "123", "edit"]);
  expect(routing.path.parentPath).toBe("/register/edit");
});

test("getRouting() should mark rewrite as false when originPathname only differs by a trailing slash", () => {
  const url = new URL("https://example.com/register/123");

  const routing = getRouting(url, "/register/123/", "/register/[id]", {
    id: "123",
  });

  expect(routing.path.rewrite).toBe(false);
});

test("getRouting() should mark rewrite as true when originPathname differs from the url pathname", () => {
  const url = new URL("https://example.com/register/123");

  const routing = getRouting(url, "/oude/route", "/register/[id]", {
    id: "123",
  });

  expect(routing.path.rewrite).toBe(true);
});

test("getRouting() should handle the root pattern", () => {
  const url = new URL("https://example.com/");

  const routing = getRouting(url, "/", "/", {});

  expect(routing.pattern.patternItems).toEqual(["", ""]);
  expect(routing.path.pathItems).toEqual(["", ""]);
  expect(routing.path.parentPath).toBe("/");
});

test("getRouting() should return empty query objects when there are no search params", () => {
  const url = new URL("https://example.com/register/123");

  const routing = getRouting(url, "/register/123", "/register/[id]", {
    id: "123",
  });

  expect(routing.query).toEqual({});
  expect(routing.queryObject).toEqual({});
});

test("getRouting() should differ between query (last value wins) and queryObject (keeps duplicates) for repeated keys", () => {
  const url = new URL(
    "https://example.com/register?status=active&status=retired",
  );

  const routing = getRouting(url, "/register", "/register", {});

  expect(routing.query).toEqual({ status: "retired" });
  expect(routing.queryObject).toEqual({ status: ["active", "retired"] });
});

test("getRouting() should pass params through unchanged", () => {
  const url = new URL("https://example.com/register/123/edit/456");
  const params = { id: "123", subId: "456" };

  const routing = getRouting(
    url,
    "/register/123/edit/456",
    "/register/[id]/edit/[subId]",
    params,
  );

  expect(routing.pattern.params).toBe(params);
});
