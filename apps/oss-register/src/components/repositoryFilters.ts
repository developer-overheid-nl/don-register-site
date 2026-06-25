import type { FilterData } from "@developer-overheid-nl/don-register-components";

const ARCHIVED_FILTER_KEY = "archived";

const getArchivedFilterCount = (filter: FilterData | undefined) => {
  if (filter && "count" in filter && typeof filter.count === "number") {
    return filter.count;
  }

  return 0;
};

export const getArchivedFilterValue = (
  value: string | string[] | undefined,
): boolean => {
  if (Array.isArray(value)) {
    return value.includes("true");
  }

  return value === "true";
};

export const withArchivedRepositoryFilter = (
  filters: FilterData[] | null | undefined,
  value = false,
): FilterData[] => {
  const filterList = filters ?? [];
  const createArchivedFilter = (filter?: FilterData): FilterData => ({
    key: ARCHIVED_FILTER_KEY,
    label: "Repository status",
    description: "Bepaal of gearchiveerde repositories worden getoond.",
    type: "multi-select",
    options: [
      {
        value: "true",
        label: "Toon gearchiveerde repositories",
        description: filter?.description ?? null,
        count: getArchivedFilterCount(filter),
        selected: value,
      },
    ],
  });

  if (filterList.some((filter) => filter.key === ARCHIVED_FILTER_KEY)) {
    return filterList.map((filter) =>
      filter.key === ARCHIVED_FILTER_KEY
        ? createArchivedFilter(filter)
        : filter,
    );
  }

  return [...filterList, createArchivedFilter()];
};
