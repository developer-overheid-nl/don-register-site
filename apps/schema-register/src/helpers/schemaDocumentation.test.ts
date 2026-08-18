import { expect, test } from "vitest";
import { createSchemaDocumentation } from "./schemaDocumentation";

test("creates documentation from root schema and nested properties", () => {
  const documentation = createSchemaDocumentation({
    title: "Zaak",
    description: "Een zaak in behandeling.",
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "Unieke identificatie.",
        format: "uuid",
      },
      links: {
        type: "array",
        items: {
          $ref: "https://schemas.example.test/link.schema.json",
        },
      },
      metadata: {
        type: "object",
        required: ["createdAt"],
        properties: {
          createdAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
    },
  });

  expect(documentation?.overviewItems).toEqual([
    { key: "Title", value: "Zaak" },
    { key: "Description", value: "Een zaak in behandeling." },
    { key: "Type", value: "object" },
  ]);

  expect(documentation?.nodes).toContainEqual({
    id: "id",
    title: "id",
    depth: 0,
    items: [
      { key: "Description", value: "Unieke identificatie." },
      { key: "Type", value: "string" },
      { key: "Required", value: "Ja" },
      { key: "Format", value: "uuid" },
    ],
  });

  expect(documentation?.nodes).toContainEqual({
    id: "links",
    title: "links",
    depth: 0,
    items: [
      { key: "Type", value: "array" },
      { key: "Required", value: "Nee" },
      { key: "Items type", value: "$ref" },
      {
        key: "Items $ref",
        value: "https://schemas.example.test/link.schema.json",
        href: "https://schemas.example.test/link.schema.json",
      },
    ],
  });

  expect(documentation?.nodes).toContainEqual({
    id: "metadata.createdat",
    title: "metadata.createdAt",
    depth: 1,
    items: [
      { key: "Type", value: "string" },
      { key: "Required", value: "Ja" },
      { key: "Format", value: "date-time" },
    ],
  });
});

test("returns null when schema content is not an object", () => {
  expect(createSchemaDocumentation(null)).toBeNull();
  expect(createSchemaDocumentation("schema")).toBeNull();
});

test("creates documentation table rows with primary columns and secondary details", () => {
  const documentation = createSchemaDocumentation({
    title: "Zaak",
    description: "Een zaak in behandeling.",
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "Unieke identificatie.",
        format: "uuid",
      },
    },
  });

  expect(documentation?.tableRows).toEqual([
    {
      property: "Zaak",
      type: "object",
      required: "-",
      description: "Een zaak in behandeling.",
      depth: 0,
      isRoot: true,
      details: [],
    },
    {
      property: "id",
      type: "string",
      required: "Ja",
      description: "Unieke identificatie.",
      depth: 0,
      isRoot: false,
      details: [{ key: "Format", value: "uuid" }],
    },
  ]);
});

test("preserves nested paths and linked references in documentation table rows", () => {
  const documentation = createSchemaDocumentation({
    type: "object",
    properties: {
      metadata: {
        type: "object",
        properties: {
          link: {
            title: "Link object",
            $ref: "https://schemas.example.test/link.schema.json",
          },
        },
      },
    },
  });

  expect(documentation?.tableRows).toContainEqual({
    property: "metadata.link",
    type: "$ref",
    required: "Nee",
    description: "-",
    depth: 1,
    isRoot: false,
    details: [
      {
        key: "$ref",
        value: "https://schemas.example.test/link.schema.json",
        href: "https://schemas.example.test/link.schema.json",
      },
    ],
  });
});
