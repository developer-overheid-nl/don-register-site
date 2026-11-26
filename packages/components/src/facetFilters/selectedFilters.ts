import {
  type FilterData,
  FilterType,
  type SelectedFilters,
  type SelectedFiltersMap,
} from "./types";

/**
 * @deprecated Use getSelectedFiltersMap, that will return a map with keys as a tuple with key and label
 * @param filters
 * @param withLabels Note: keys have no labels, use the map version
 * @returns object
 */
export const getSelectedFilters = (
  filters: FilterData[] | null | undefined,
  withLabels = false,
): SelectedFilters => {
  return (
    filters?.reduce((acc, filter) => {
      if (
        filter.type === FilterType.Multi ||
        filter.type === FilterType.SearchMulti
      ) {
        const keys: (string | [string, string])[] = filter.options
          ?.filter((option) => option.selected)
          .map((option) =>
            withLabels ? [option.value, option.label] : option.value,
          );
        if (keys?.length > 0) {
          acc[filter.key] = keys;
        }
      } else if (filter.type === FilterType.Toggle && filter.value) {
        acc[filter.key] = withLabels
          ? [
              [
                "true",
                Array.isArray(filter.label) ? filter.label[0] : filter.label,
              ],
            ]
          : ["true"];
      } else if (filter.type === FilterType.Date && filter.value) {
        acc[filter.key] = withLabels
          ? [[filter.value, filter.label]]
          : [filter.value];
      } else if (
        filter.type === FilterType.Single ||
        filter.type === FilterType.SearchSingle ||
        filter.type === FilterType.Search
      ) {
        const selectedOption = filter.options?.find(
          (option) => option.selected,
        );
        if (selectedOption) {
          acc[filter.key] = withLabels
            ? [[selectedOption.value, selectedOption.label]]
            : [selectedOption.value];
        }
      }
      return acc;
    }, {} as SelectedFilters) ?? {}
  );
};

export const getSelectedFiltersMap = (
  filters: FilterData[] | null | undefined,
  withLabels = false,
): SelectedFiltersMap => {
  return (
    filters?.reduce((acc, filter) => {
      if (
        filter.type === FilterType.Multi ||
        filter.type === FilterType.SearchMulti
      ) {
        const keys: (string | [string, string])[] = filter.options
          ?.filter((option) => option.selected)
          .map((option) =>
            withLabels ? [option.value, option.label] : option.value,
          );
        if (keys?.length > 0) {
          withLabels
            ? acc.set([filter.key, filter.label], keys)
            : acc.set(filter.key, keys);
        }
      } else if (filter.type === FilterType.Toggle) {
        let value = filter.value && "true";
        const keyLabel = Array.isArray(filter.label)
          ? filter.label[0]
          : filter.label;
        const valueLabel = Array.isArray(filter.label)
          ? filter.value
            ? filter.label[0]
            : filter.label[1]
          : filter.label;

        if (filter.isExplicitFalse) {
          value = filter.value ? "true" : "false";
        }

        if (value) {
          withLabels
            ? acc.set([filter.key, keyLabel], [[value, valueLabel]])
            : acc.set(filter.key, [value]);
        }
      } else if (filter.type === FilterType.Date && filter.value) {
        withLabels
          ? acc.set([filter.key, filter.label], [[filter.value, filter.label]])
          : acc.set(filter.key, [filter.value]);
      } else if (
        filter.type === FilterType.Single ||
        filter.type === FilterType.SearchSingle ||
        filter.type === FilterType.Search
      ) {
        const selectedOption = filter.options?.find(
          (option) => option.selected,
        );
        if (selectedOption) {
          withLabels
            ? acc.set(
                [filter.key, filter.label],
                [[selectedOption.value, selectedOption.label]],
              )
            : acc.set(filter.key, [selectedOption.value]);
        }
      }
      return acc;
    }, new Map() as SelectedFiltersMap) ?? new Map()
  );
};

export const updateFilters = (
  selectedFilters: SelectedFilters,
  filterKey: string,
  filterValue: string,
  checked: boolean,
  type: FilterType,
): SelectedFilters => {
  if (type === FilterType.Toggle) {
    return {
      ...selectedFilters,
      [filterKey]: [checked ? filterValue : "false"],
    };
  }

  // Radio-based filters hold one value; an empty value is the "all" option
  if (
    type === FilterType.Single ||
    type === FilterType.SearchSingle ||
    type === FilterType.Search
  ) {
    return {
      ...selectedFilters,
      [filterKey]: filterValue ? [filterValue] : [],
    };
  }

  // Checkbox-based filters: drop the value first, so it is never listed twice
  const otherValues = (selectedFilters[filterKey] || []).filter(
    (value) => value !== filterValue,
  );

  return {
    ...selectedFilters,
    [filterKey]: checked ? [...otherValues, filterValue] : otherValues,
  };
};
