import { expect, test } from "vitest";
import {
  getSearchParams,
  searchParamsToArray,
  searchParamsToObject,
} from "./getSearchParams";

const defaultSearchParamsURL = new URL(
  "https://example.com?sortBy=title&sortOrder=asc&status=active&status=retired&auth=api_key&organisation=https%3A%2F%2Fdeveloper.overheid.nl%2F",
);

test("searchParamsToObject() should create a correct object", () => {
  expect(searchParamsToObject(defaultSearchParamsURL.searchParams)).toEqual({
    auth: "api_key",
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
    status: ["active", "retired"],
  });
});

test("searchParamsToArray() should create a correct array", () => {
  expect(searchParamsToArray(defaultSearchParamsURL.searchParams)).toEqual([
    ["sortBy", "title"],
    ["sortOrder", "asc"],
    ["status", "active"],
    ["status", "retired"],
    ["auth", "api_key"],
    ["organisation", "https://developer.overheid.nl/"],
  ]);
});

test("getSearchParams() should get all search params when no options are given", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL);

  expect(searchParams).toEqual({
    auth: "api_key",
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
    status: ["active", "retired"],
  });
});

test("getSearchParams() should get the value(s) of a single search param when given a key", () => {
  const searchParams1 = getSearchParams(defaultSearchParamsURL, "auth");
  const searchParams2 = getSearchParams(defaultSearchParamsURL, "status");

  expect(searchParams1).toEqual({
    auth: "api_key",
  });
  expect(searchParams2).toEqual({
    status: ["active", "retired"],
  });
});

test("getSearchParams() should return empty array when non existing key is given", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    "nonExistingKey",
  );

  expect(searchParams).toEqual({});
});

test("getSearchParams() should get only the selected query params that are included", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    include: ["auth", "status"],
  });

  expect(searchParams).toEqual({
    auth: "api_key",
    status: ["active", "retired"],
  });
});

test("getSearchParams() should get only the selected query params that are included and exist", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    include: ["nonExistingKey", "status"],
  });

  expect(searchParams).toEqual({
    status: ["active", "retired"],
  });
});

test("getSearchParams() should get all query params execept the ones that are excluded", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    exclude: ["auth", "status"],
  });

  expect(searchParams).toEqual({
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
  });
});

test("getSearchParams() should get all query params execept the ones that are excluded, key-value pair exclusion", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    exclude: ["auth", ["status", "retired"]],
  });

  expect(searchParams).toEqual({
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
    // only "status=retired" was excluded, 'active' should still be here:
    status: "active",
  });
});

test("getSearchParams() should get all query params execept the ones that are excluded and ignore non existing keys", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    exclude: ["nonExistingKey", "status"],
  });

  expect(searchParams).toEqual({
    auth: "api_key",
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
  });
});

test("getSearchParams() should get only the query params that are both included and not excluded", () => {
  const searchParams = getSearchParams(defaultSearchParamsURL, {
    include: ["organisation", "status"],
    exclude: ["auth", "status"],
  });

  // 'status' was both included as excluded, exclusion takes precedence.
  expect(searchParams).not.toHaveProperty("status");
  expect(searchParams).toEqual({
    organisation: "https://developer.overheid.nl/",
  });
});

test("getSearchParams() should get all search params as an array when outputType 'array' is given", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    undefined,
    "array",
  );

  expect(searchParams).toEqual([
    ["sortBy", "title"],
    ["sortOrder", "asc"],
    ["status", "active"],
    ["status", "retired"],
    ["auth", "api_key"],
    ["organisation", "https://developer.overheid.nl/"],
  ]);
});

test("getSearchParams() should get the value(s) of a single search param as an array when given a key and outputType 'array'", () => {
  const searchParams1 = getSearchParams(
    defaultSearchParamsURL,
    "auth",
    "array",
  );
  const searchParams2 = getSearchParams(
    defaultSearchParamsURL,
    "status",
    "array",
  );

  expect(searchParams1).toEqual([["auth", "api_key"]]);
  expect(searchParams2).toEqual([
    ["status", "active"],
    ["status", "retired"],
  ]);
});

test("getSearchParams() should return an empty array when non existing key is given with outputType 'array'", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    "nonExistingKey",
    "array",
  );

  expect(searchParams).toEqual([]);
});

test("getSearchParams() should get only the selected query params that are included as an array", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    { include: ["auth", "status"] },
    "array",
  );

  expect(searchParams).toEqual([
    ["auth", "api_key"],
    ["status", "active"],
    ["status", "retired"],
  ]);
});

test("getSearchParams() should get all query params execept the ones that are excluded as an array", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    { exclude: ["auth", "status"] },
    "array",
  );

  expect(searchParams).toEqual([
    ["sortBy", "title"],
    ["sortOrder", "asc"],
    ["organisation", "https://developer.overheid.nl/"],
  ]);
});

test("getSearchParams() should get all query params execept the ones that are excluded as an array, key-value pair exclusion", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    { exclude: ["auth", ["status", "retired"]] },
    "array",
  );

  expect(searchParams).toEqual([
    ["sortBy", "title"],
    ["sortOrder", "asc"],
    // only "status=retired" was excluded, 'active' should still be here:
    ["status", "active"],
    ["organisation", "https://developer.overheid.nl/"],
  ]);
});

test("getSearchParams() should get only the query params that are both included and not excluded as an array", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    { include: ["organisation", "status"], exclude: ["auth", "status"] },
    "array",
  );

  // 'status' was both included as excluded, exclusion takes precedence.
  expect(searchParams).toEqual([
    ["organisation", "https://developer.overheid.nl/"],
  ]);
});

test("getSearchParams() should default to an object output when outputType 'object' is explicitly given", () => {
  const searchParams = getSearchParams(
    defaultSearchParamsURL,
    undefined,
    "object",
  );

  expect(searchParams).toEqual({
    auth: "api_key",
    organisation: "https://developer.overheid.nl/",
    sortBy: "title",
    sortOrder: "asc",
    status: ["active", "retired"],
  });
});
