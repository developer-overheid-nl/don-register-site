import type { ChangeEvent } from "react";

export enum FilterType {
  Toggle = "toggle",
  Date = "date",
  Multi = "multi-select",
  Single = "single-select",
  SearchSingle = "search-single-select",
  SearchMulti = "search-multi-select",
  /** @deprecated Use `search-single-select` (`FilterType.SearchSingle`). */
  Search = "search-select",
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string | null;
  count: number;
  selected: boolean;
}

type FilterLabel<T> = T extends string ? string : string | [string, string];

interface BaseFilterItems {
  key: string;
  label: FilterLabel<string>;
  description: string;
}

export interface ToggleFilterData extends Omit<BaseFilterItems, "label"> {
  type: FilterType.Toggle;
  isExplicitFalse?: boolean;
  label: FilterLabel<unknown>;
  value?: boolean;
  count?: number;
}

export interface DateFilterData extends BaseFilterItems {
  type: FilterType.Date;
  value?: string;
  count?: number;
}

export interface MultiSelectFilterData extends BaseFilterItems {
  type: FilterType.Multi;
  options: SelectOption[];
}

export interface SingleSelectFilterData extends BaseFilterItems {
  type: FilterType.Single;
  options: SelectOption[];
}

export interface SearchSelectFilterData extends BaseFilterItems {
  /** `search-select` is deprecated and handled as `search-single-select`. */
  type: FilterType.SearchSingle | FilterType.SearchMulti | FilterType.Search;
  options: SelectOption[];
  /** Number of options shown before "show more" is used. */
  showTop?: number;
}

export type FilterData =
  | ToggleFilterData
  | DateFilterData
  | MultiSelectFilterData
  | SingleSelectFilterData
  | SearchSelectFilterData;

export type SelectedFilters = Record<string, Array<string | [string, string]>>;

export type SelectedFiltersMap = Map<
  string | [string, string],
  Array<string | [string, string]>
>;

/** Props shared by every filter type component. */
export interface FilterComponentProps<T extends FilterData> {
  facet: T;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
