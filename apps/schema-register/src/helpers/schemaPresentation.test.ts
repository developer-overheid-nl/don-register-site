import { describe, expect, test } from "vitest";
import {
  createDependencyPresentation,
  createHealthIssuesTable,
  createJsonSchemaViewerUrl,
  createSchemaCardPresentation,
} from "./schemaPresentation";

describe("createJsonSchemaViewerUrl", () => {
  test("creates a json-schema.app URL that preserves the complete schema URL", () => {
    expect(
      createJsonSchemaViewerUrl(
        "https://static.example.test/schemas/voorbeeld?version=1&format=json",
      ),
    ).toBe(
      "https://json-schema.app/view/%23?url=https%3A%2F%2Fstatic.example.test%2Fschemas%2Fvoorbeeld%3Fversion%3D1%26format%3Djson",
    );
  });
});

describe("createSchemaCardPresentation", () => {
  test("places dependencies with the descriptive badges and health separately", () => {
    expect(
      createSchemaCardPresentation({
        dialect: "2020-12",
        rootType: "object",
        sourceMetaDependencies: 1234,
        sourceMetaHealth: 75,
      }),
    ).toEqual({
      badges: [
        {
          label: "Dialect",
          value: "2020-12",
          color: "mintgroen",
        },
        {
          label: "Type",
          value: "object",
          color: "lichtblauw",
        },
        {
          label: "Dependencies",
          value: "1.234",
          color: "coolgrey",
        },
      ],
      health: {
        label: "Health",
        value: "75",
      },
    });
  });

  test("keeps unknown values explicit and omits an unavailable health score", () => {
    expect(createSchemaCardPresentation({})).toEqual({
      badges: [
        {
          label: "Dialect",
          value: "unknown",
          color: "grijs",
        },
        {
          label: "Type",
          value: "unknown",
          color: "grijs",
        },
        {
          label: "Dependencies",
          value: "-",
          color: "coolgrey",
        },
      ],
      health: null,
    });
  });
});

describe("createHealthIssuesTable", () => {
  test("prioritises messages and hides the pointer column when pointers are blank", () => {
    expect(
      createHealthIssuesTable([
        {
          name: "top_level_title",
          message: "Set a concise non-empty title",
          description: "Internal explanation",
          pointers: ["", "  "],
        },
      ]),
    ).toEqual({
      showPointerColumn: false,
      rows: [
        {
          message: "Set a concise non-empty title",
          pointer: null,
        },
      ],
    });
  });

  test("retains non-empty pointers as secondary information", () => {
    expect(
      createHealthIssuesTable([
        {
          name: "description_trailing_period",
          message: "Descriptions should not end with a period",
          pointers: ["/properties/links/description"],
        },
        {
          name: "top_level_examples",
          message: "Set a non-empty examples array",
          pointers: [""],
        },
      ]),
    ).toEqual({
      showPointerColumn: true,
      rows: [
        {
          message: "Descriptions should not end with a period",
          pointer: "/properties/links/description",
        },
        {
          message: "Set a non-empty examples array",
          pointer: null,
        },
      ],
    });
  });
});

describe("createDependencyPresentation", () => {
  test("separates direct outgoing and incoming relations and ignores unrelated edges", () => {
    expect(
      createDependencyPresentation(
        [
          {
            from: "https://schemas.example/current",
            to: "https://schemas.example/target",
            at: "/properties/outgoing/$ref",
            fromSchemaId: "current",
            fromSchemaUrl: "schemas/current",
            fromSchemaTitle: "Current schema",
            toSchemaId: "target",
            toSchemaUrl: "schemas/target",
            toSchemaTitle: "Target schema",
          },
          {
            from: "https://schemas.example/source",
            to: "https://schemas.example/current",
            at: "/properties/incoming/$ref",
            fromSchemaId: "source",
            fromSchemaUrl: "schemas/source",
            fromSchemaTitle: "Source schema",
            toSchemaId: "current",
            toSchemaUrl: "schemas/current",
            toSchemaTitle: "Current schema",
          },
          {
            from: "https://schemas.example/unrelated-source",
            to: "https://schemas.example/unrelated-target",
            at: "/properties/unrelated/$ref",
            fromSchemaId: "unrelated-source",
            toSchemaId: "unrelated-target",
          },
        ],
        {
          id: "current",
          schemaUrl: "https://static.example/current",
          canonicalUrl: "https://schemas.example/current",
        },
      ),
    ).toEqual({
      outgoing: [
        {
          schemaLabel: "Target schema",
          schemaUrl: "schemas/target",
          at: "/properties/outgoing/$ref",
        },
      ],
      incoming: [
        {
          schemaLabel: "Source schema",
          schemaUrl: "schemas/source",
          at: "/properties/incoming/$ref",
        },
      ],
    });
  });

  test("recognises relations by canonical and local schema URLs when ids are absent", () => {
    expect(
      createDependencyPresentation(
        [
          {
            from: "https://schemas.example/current/",
            to: "https://schemas.example/target",
            at: "/outgoing",
            toSchemaTitle: "Target via canonical URL",
          },
          {
            from: "https://schemas.example/source",
            to: "https://schemas.example/current",
            at: "/incoming",
            fromSchemaTitle: "Source via canonical URL",
          },
        ],
        {
          id: "current",
          schemaUrl: "/schemas/current",
          canonicalUrl: "https://schemas.example/current",
        },
      ),
    ).toEqual({
      outgoing: [
        {
          schemaLabel: "Target via canonical URL",
          schemaUrl: undefined,
          at: "/outgoing",
        },
      ],
      incoming: [
        {
          schemaLabel: "Source via canonical URL",
          schemaUrl: undefined,
          at: "/incoming",
        },
      ],
    });
  });
});
