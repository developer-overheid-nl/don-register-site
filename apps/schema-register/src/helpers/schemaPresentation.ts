type SchemaCardData = {
  dialect?: string | null;
  rootType?: string | null;
  sourceMetaDependencies?: number | null;
  sourceMetaHealth?: number | null;
};

type HealthIssue = {
  name?: string;
  message: string;
  description?: string;
  pointers?: string[] | null;
};

type SchemaDependency = {
  from: string;
  to: string;
  at: string;
  fromSchemaId?: string;
  fromSchemaUrl?: string;
  fromSchemaTitle?: string;
  toSchemaId?: string;
  toSchemaUrl?: string;
  toSchemaTitle?: string;
};

type CurrentSchema = {
  id: string;
  schemaUrl?: string;
  canonicalUrl?: string;
};

const formatNumber = (value: number | null | undefined) =>
  value === null || value === undefined
    ? "-"
    : new Intl.NumberFormat("nl-NL").format(value);

export const createJsonSchemaViewerUrl = (schemaUrl: string) =>
  `https://json-schema.app/view/%23?url=${encodeURIComponent(schemaUrl)}`;

export const createSchemaCardPresentation = (schema: SchemaCardData) => ({
  badges: [
    {
      label: "Dialect",
      value: schema.dialect || "unknown",
      color:
        schema.dialect && schema.dialect !== "unknown" ? "mintgroen" : "grijs",
    },
    {
      label: "Type",
      value: schema.rootType || "unknown",
      color:
        schema.rootType && schema.rootType !== "unknown"
          ? "lichtblauw"
          : "grijs",
    },
    {
      label: "Dependencies",
      value: formatNumber(schema.sourceMetaDependencies),
      color: "coolgrey",
    },
  ],
  health:
    schema.sourceMetaHealth === null || schema.sourceMetaHealth === undefined
      ? null
      : {
          label: "Health",
          value: String(schema.sourceMetaHealth),
        },
});

export const createHealthIssuesTable = (issues: HealthIssue[]) => {
  const rows = issues.map((issue) => {
    const pointers = (issue.pointers ?? [])
      .map((pointer) => pointer.trim())
      .filter(Boolean);

    return {
      message: issue.message,
      pointer: pointers.length > 0 ? pointers.join(" – ") : null,
    };
  });

  return {
    showPointerColumn: rows.some((row) => row.pointer !== null),
    rows,
  };
};

const normalizeReference = (reference: string | undefined) => {
  const normalized = reference?.trim().replace(/\/+$/, "");

  if (!normalized) {
    return [];
  }

  if (normalized.startsWith("/schemas/")) {
    return [normalized, normalized.slice(1)];
  }

  if (normalized.startsWith("schemas/")) {
    return [normalized, `/${normalized}`];
  }

  return [normalized];
};

export const createDependencyPresentation = (
  dependencies: SchemaDependency[],
  currentSchema: CurrentSchema,
) => {
  const currentReferences = new Set(
    [
      currentSchema.id,
      `schemas/${currentSchema.id}`,
      `/schemas/${currentSchema.id}`,
      currentSchema.schemaUrl,
      currentSchema.canonicalUrl,
    ].flatMap(normalizeReference),
  );
  const isCurrentSchema = (references: Array<string | undefined>) =>
    references
      .flatMap(normalizeReference)
      .some((reference) => currentReferences.has(reference));
  const outgoing = [];
  const incoming = [];

  for (const dependency of dependencies) {
    if (
      isCurrentSchema([
        dependency.fromSchemaId,
        dependency.fromSchemaUrl,
        dependency.from,
      ])
    ) {
      outgoing.push({
        schemaLabel:
          dependency.toSchemaTitle ||
          dependency.toSchemaUrl ||
          dependency.toSchemaId ||
          dependency.to,
        schemaUrl: dependency.toSchemaUrl,
        at: dependency.at,
      });
    }

    if (
      isCurrentSchema([
        dependency.toSchemaId,
        dependency.toSchemaUrl,
        dependency.to,
      ])
    ) {
      incoming.push({
        schemaLabel:
          dependency.fromSchemaTitle ||
          dependency.fromSchemaUrl ||
          dependency.fromSchemaId ||
          dependency.from,
        schemaUrl: dependency.fromSchemaUrl,
        at: dependency.at,
      });
    }
  }

  return { outgoing, incoming };
};
