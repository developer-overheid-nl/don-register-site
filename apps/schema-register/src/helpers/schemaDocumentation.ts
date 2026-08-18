type JsonSchemaValue =
  | string
  | number
  | boolean
  | null
  | JsonSchemaObject
  | JsonSchemaValue[];

type JsonSchemaObject = {
  [key: string]: JsonSchemaValue | undefined;
};

export type SchemaDocumentationItem = {
  key: string;
  value: string;
  href?: string;
};

export type SchemaDocumentationNode = {
  id: string;
  title: string;
  depth: number;
  items: SchemaDocumentationItem[];
};

export type SchemaDocumentationTableRow = {
  property: string;
  type: string;
  required: string;
  description: string;
  depth: number;
  isRoot: boolean;
  details: SchemaDocumentationItem[];
};

export type SchemaDocumentation = {
  overviewItems: SchemaDocumentationItem[];
  nodes: SchemaDocumentationNode[];
  tableRows: SchemaDocumentationTableRow[];
};

const COMBINER_KEYS = ["oneOf", "anyOf", "allOf"] as const;
const TABLE_COLUMN_KEYS = new Set(["Title", "Type", "Required", "Description"]);

const isObject = (value: unknown): value is JsonSchemaObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isSchemaObject = (value: unknown): value is JsonSchemaObject =>
  isObject(value);

const getString = (value: unknown) =>
  typeof value === "string" && value.trim() ? value : undefined;

const getNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const stringifyValue = (value: unknown): string | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => stringifyValue(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const addItem = (
  items: SchemaDocumentationItem[],
  key: string,
  value: unknown,
  href?: string,
) => {
  const formattedValue = stringifyValue(value);

  if (formattedValue) {
    items.push({ key, value: formattedValue, href });
  }
};

const getTypeLabel = (schema: JsonSchemaObject) => {
  const type = stringifyValue(schema.type);
  const ref = getString(schema.$ref);

  if (type) {
    return type;
  }

  if (ref) {
    return "$ref";
  }

  if (Array.isArray(schema.oneOf)) {
    return "oneOf";
  }

  if (Array.isArray(schema.anyOf)) {
    return "anyOf";
  }

  if (Array.isArray(schema.allOf)) {
    return "allOf";
  }

  if (isObject(schema.properties)) {
    return "object";
  }

  return undefined;
};

const getRefHref = (ref: string | undefined) =>
  ref?.startsWith("http://") || ref?.startsWith("https://") ? ref : undefined;

const getRequiredKeys = (schema: JsonSchemaObject) =>
  Array.isArray(schema.required)
    ? schema.required.filter((item): item is string => typeof item === "string")
    : [];

const getSchemaItems = (
  schema: JsonSchemaObject,
  isRequired?: boolean,
): SchemaDocumentationItem[] => {
  const items: SchemaDocumentationItem[] = [];
  const ref = getString(schema.$ref);

  addItem(items, "Title", schema.title);
  addItem(items, "Description", schema.description);
  addItem(items, "Type", getTypeLabel(schema));
  if (isRequired !== undefined) {
    addItem(items, "Required", isRequired ? "Ja" : "Nee");
  }
  addItem(items, "$ref", ref, getRefHref(ref));
  addItem(items, "Enum", schema.enum);
  addItem(items, "Const", schema.const);
  addItem(items, "Default", schema.default);
  addItem(items, "Format", schema.format);
  addItem(items, "Pattern", schema.pattern);
  addItem(items, "Minimum", getNumber(schema.minimum));
  addItem(items, "Maximum", getNumber(schema.maximum));
  addItem(items, "Min length", getNumber(schema.minLength));
  addItem(items, "Max length", getNumber(schema.maxLength));
  addItem(items, "Min items", getNumber(schema.minItems));
  addItem(items, "Max items", getNumber(schema.maxItems));
  addItem(items, "Unique items", schema.uniqueItems);

  if (isSchemaObject(schema.items)) {
    const itemsRef = getString(schema.items.$ref);
    addItem(items, "Items type", getTypeLabel(schema.items));
    addItem(items, "Items $ref", itemsRef, getRefHref(itemsRef));
  }

  for (const combinerKey of COMBINER_KEYS) {
    if (Array.isArray(schema[combinerKey])) {
      addItem(items, combinerKey, `${schema[combinerKey].length} schema's`);
    }
  }

  return items;
};

const getNodeTitle = (name: string, schema: JsonSchemaObject) =>
  getString(schema.title) || name;

const getItemValue = (items: SchemaDocumentationItem[], key: string) =>
  items.find((item) => item.key === key)?.value;

const createTableRow = (
  property: string,
  items: SchemaDocumentationItem[],
  depth: number,
  isRoot: boolean,
): SchemaDocumentationTableRow => ({
  property,
  type: getItemValue(items, "Type") || "-",
  required: getItemValue(items, "Required") || "-",
  description: getItemValue(items, "Description") || "-",
  depth,
  isRoot,
  details: items.filter((item) => !TABLE_COLUMN_KEYS.has(item.key)),
});

const collectProperties = (
  schema: JsonSchemaObject,
  nodes: SchemaDocumentationNode[],
  tableRows: SchemaDocumentationTableRow[],
  parentPath = "",
  depth = 0,
  parentRequiredKeys: string[] = [],
) => {
  if (isObject(schema.properties)) {
    for (const [key, value] of Object.entries(schema.properties)) {
      if (!isSchemaObject(value)) {
        continue;
      }

      const path = parentPath ? `${parentPath}.${key}` : key;
      const items = getSchemaItems(value, parentRequiredKeys.includes(key));
      nodes.push({
        id: path.toLowerCase(),
        title: getNodeTitle(path, value),
        depth,
        items,
      });
      tableRows.push(createTableRow(path, items, depth, false));
      collectProperties(
        value,
        nodes,
        tableRows,
        path,
        depth + 1,
        getRequiredKeys(value),
      );
    }
  }

  if (isSchemaObject(schema.items)) {
    collectProperties(
      schema.items,
      nodes,
      tableRows,
      parentPath ? `${parentPath}[]` : "items",
      depth + 1,
      getRequiredKeys(schema.items),
    );
  }

  for (const combinerKey of COMBINER_KEYS) {
    const values = schema[combinerKey];
    if (!Array.isArray(values)) {
      continue;
    }

    values.forEach((value, index) => {
      if (!isSchemaObject(value)) {
        return;
      }

      collectProperties(
        value,
        nodes,
        tableRows,
        parentPath
          ? `${parentPath}.${combinerKey}[${index + 1}]`
          : `${combinerKey}[${index + 1}]`,
        depth + 1,
        getRequiredKeys(value),
      );
    });
  }
};

export const createSchemaDocumentation = (
  schema: unknown,
): SchemaDocumentation | null => {
  if (!isSchemaObject(schema)) {
    return null;
  }

  const overviewItems = getSchemaItems(schema);
  const nodes: SchemaDocumentationNode[] = [];
  const tableRows = [
    createTableRow(
      getItemValue(overviewItems, "Title") || "Schema",
      overviewItems,
      0,
      true,
    ),
  ];
  collectProperties(schema, nodes, tableRows, "", 0, getRequiredKeys(schema));

  if (overviewItems.length === 0 && nodes.length === 0) {
    return null;
  }

  return {
    overviewItems,
    nodes,
    tableRows,
  };
};
