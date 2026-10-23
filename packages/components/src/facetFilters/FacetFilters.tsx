"use client";

import clsx from "clsx";
import type { ChangeEvent, MouseEvent } from "react";
import {
  type HTMLProps,
  type PropsWithChildren,
  useRef,
  useState,
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Fieldset from "../fieldset/FieldSet";
import FormFieldCheckboxGroup from "../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldRadioGroup from "../formFieldRadioGroup/FormFieldRadioGroup";
import FormFieldRadioOption from "../formFieldRadioOption/FormFieldRadioOption";
import FormFieldSwitch from "../formFieldSwitch/FormFieldSwitch";
import FormFieldTextInput from "../formFieldTextInput/FormFieldTextInput";
import Heading, {
  clampHeadingLevel,
  type HeadingProps,
} from "../heading/Heading";
import i18n from "../i18n";
import Icon from "../iconsSprite/Icon";
import LinkButton from "../link/LinkButton";
import Paragraph from "../paragraph/Paragraph";
import ToolTip from "../toolTip/ToolTip";
import styles from "./styles.module.css";

enum FilterType {
  Toggle = "toggle",
  Date = "date",
  Multi = "multi-select",
  Single = "single-select",
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

interface ToggleFilterData extends Omit<BaseFilterItems, "label"> {
  type: FilterType.Toggle;
  isExplicitFalse?: boolean;
  label: FilterLabel<unknown>;
  value?: boolean;
  count?: number;
}

interface DateFilterData extends BaseFilterItems {
  type: FilterType.Date;
  value?: string;
  count?: number;
}

interface MultiSelectFilterData extends BaseFilterItems {
  type: FilterType.Multi;
  options: SelectOption[];
}

interface SingleSelectFilterData extends BaseFilterItems {
  type: FilterType.Single;
  options: SelectOption[];
}

interface SearchSelectFilterData extends BaseFilterItems {
  type: FilterType.Search;
  options: SelectOption[];
  showTop?: number;
}

export type FilterData =
  | ToggleFilterData
  | DateFilterData
  | MultiSelectFilterData
  | SingleSelectFilterData
  | SearchSelectFilterData;

type SelectedFilters = Record<string, Array<string | [string, string]>>;

type SelectedFiltersMap = Map<
  string | [string, string],
  Array<string | [string, string]>
>;

export interface FacetFiltersProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  startHeadingLevel?: HeadingProps["level"];
  filters: FilterData[] | null | undefined;

  /**
   * Keys of toggle-filters that return true when not set;
   * FIXME: Should be returned by the API: `toggle` shoud have a `isExplicitFalse` key
   */
  explicitFalseFilters?: string[];
  /**
   * Callback function called when filter option has changed.
   * @param selectedFilters current selected filters at the moment of change
   * @returns
   */
  onFilterChange?: (selectedFilters: SelectedFilters) => void;
  /**
   * Types of filters for which the onFilterChange callback should be debounced. Default: ["date", "single-select"]
   */
  debounceTypes?: Array<FilterType>;
  /**
   * Delay for debouncing the onFilterChange callback, in milliseconds. Default: 600
   */
  debounceDelay?: number;
}

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
      if (filter.type === FilterType.Multi) {
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
      } else if (filter.type === FilterType.Single) {
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
      if (filter.type === FilterType.Multi) {
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
      } else if (filter.type === FilterType.Single) {
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

const filterOptions = (
  options: SelectOption[] | undefined,
  search: string | number,
): SelectOption[] => {
  if (!options) {
    return [];
  }
  if (typeof search === "number") {
    return options.slice(0, search);
  }
  const query = search.toLowerCase();
  if (query === "") {
    return [];
  }
  return options.filter((option) => option.label.toLowerCase().includes(query));
};

const updateFilters = (
  selectedFilters: SelectedFilters,
  filterKey: string,
  filterValue: string,
  checked: boolean,
  type: FilterType,
) => {
  if (type === FilterType.Toggle) {
    return {
      ...selectedFilters,
      [filterKey]: [checked ? filterValue : "false"],
    };
  }

  return {
    ...selectedFilters,
    [filterKey]: checked
      ? [...(selectedFilters[filterKey] || []), filterValue]
      : (selectedFilters[filterKey] || []).filter(
          (value) => value !== filterValue,
        ),
  };
};

const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const FacetFilters = (props: PropsWithChildren<FacetFiltersProps>) => {
  const { t } = useTranslation();
  const thisRef = useRef<HTMLDivElement>(null);
  // Search results per filter key; `undefined` means no active search
  const [optionsState, setOptionsState] = useState<
    Record<string, SelectOption[] | undefined>
  >({});
  const [moreState, setMoreState] = useState<Record<string, boolean>>({});
  // Selected option per search-select filter key, chosen client-side
  const [selectedState, setSelectedState] = useState<
    Record<string, string | undefined>
  >({});
  const {
    title,
    startHeadingLevel = 2,
    filters,
    explicitFalseFilters,
    onFilterChange = () => {},
    debounceTypes = [FilterType.Date, FilterType.Single],
    debounceDelay = 600,
    ...restProps
  } = props;

  const selectedFilters = getSelectedFilters(filters);

  // Callback function (for React) and CustomEvent (for non-React) to notify about filter changes
  const emitChange = (newSelectedFilters: SelectedFilters) => {
    onFilterChange(newSelectedFilters);
    const customEvent = new CustomEvent("onFilterChange", {
      detail: newSelectedFilters,
    });
    if (thisRef.current) thisRef.current.dispatchEvent(customEvent);
  };

  const debouncedEmitChange = useRef(
    debounce(emitChange, debounceDelay),
  ).current;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: FilterType,
    filterKey = event.target.name,
  ) => {
    const newSelectedFilters = updateFilters(
      selectedFilters,
      filterKey,
      event.target.value,
      event.target.checked,
      type,
    );

    if (debounceTypes.includes(type)) {
      debouncedEmitChange(newSelectedFilters);
    } else {
      emitChange(newSelectedFilters);
    }
  };

  const handleInput = (
    event: ChangeEvent<HTMLInputElement>,
    filterKey = event.target.name,
    inputValue: string | number = event.target.value,
  ) => {
    console.log(event.target, filterKey, inputValue);

    setOptionsState((current) => {
      const filter = filters?.find(
        (item): item is SearchSelectFilterData =>
          item.key === filterKey && item.type === FilterType.Search,
      );

      return {
        ...current,
        [filterKey]:
          inputValue === ""
            ? undefined
            : filterOptions(filter?.options, inputValue),
      };
    });
  };

  // Show search results while searching, otherwise fall back to all or the top options
  const getVisibleOptions = (facet: SearchSelectFilterData) => {
    const searchResults = optionsState[facet.key];
    if (searchResults) {
      return searchResults;
    }
    return moreState[facet.key]
      ? facet.options
      : filterOptions(facet.options, facet.showTop ?? 0);
  };

  // Visible options plus the selected option, so a selection never disappears
  const getVisibleValues = (facet: SearchSelectFilterData) => {
    const values = new Set(
      getVisibleOptions(facet).map((option) => option.value),
    );
    const selectedValue =
      selectedState[facet.key] ??
      facet.options.find((option) => option.selected)?.value;
    if (selectedValue) {
      values.add(selectedValue);
    }
    return values;
  };

  const visibleValues = new Map(
    filters
      ?.filter(
        (facet): facet is SearchSelectFilterData =>
          facet.type === FilterType.Search,
      )
      .map((facet) => [facet.key, getVisibleValues(facet)]),
  );

  const toggleMore = (
    _event: MouseEvent<HTMLButtonElement>,
    type: FilterType,
    filterKey: string,
  ) => {
    if (type !== FilterType.Search) {
      return;
    }
    setMoreState((current) => ({
      ...current,
      [filterKey]: !current[filterKey],
    }));
  };

  return (
    <div
      ref={thisRef}
      className={clsx([styles.facetFilters, props.className])}
      {...restProps}
    >
      {title ? (
        <Heading level={startHeadingLevel} appearanceLevel={3}>
          {title}
        </Heading>
      ) : null}
      {/* Temporary filter on `date` types */}
      {filters
        ?.filter(({ type }) => type !== "date")
        .map((facet) => (
          <div className={styles.facet} key={facet.key}>
            <Heading
              level={
                title
                  ? clampHeadingLevel(startHeadingLevel + 1)
                  : startHeadingLevel
              }
              appearanceLevel={5}
              id={`${facet.key}-title`}
            >
              {facet.label}
            </Heading>
            <Paragraph id={`${facet.key}-label`} purpose="short">
              {facet.description}
            </Paragraph>
            {facet.type === "toggle" ? (
              <FormFieldSwitch
                label=""
                labelledById={`${facet.key}-label`}
                name={facet.key}
                explicit={explicitFalseFilters?.includes(facet.key)}
                defaultChecked={facet.value}
                value={
                  explicitFalseFilters?.includes(facet.key)
                    ? ["true", "false"]
                    : "true"
                }
                amount={facet.count || 0}
                labels={{
                  on: t("components.filter-on"),
                  off: t("components.filter-off"),
                }}
                onChange={(event) => handleChange(event, facet.type)}
              />
            ) : null}
            {/* TODO: Date selector
          {facet.type === "date" ? <div>TODO</div> : null}
          */}
            {facet.type === "multi-select" ? (
              <FormFieldCheckboxGroup>
                {facet.options?.map((option) => (
                  <FormFieldCheckboxOption
                    key={option.value}
                    label={option.label}
                    name={facet.key}
                    value={option.value}
                    defaultChecked={option.selected}
                    amount={option.count}
                    onChange={(event) => handleChange(event, facet.type)}
                  >
                    {option.description ? (
                      <ToolTip
                        text={option.description}
                        aria-label={t("components.info-about", {
                          subject: option.label,
                        })}
                      />
                    ) : null}
                  </FormFieldCheckboxOption>
                ))}
              </FormFieldCheckboxGroup>
            ) : null}
            {facet.type === "single-select" ? (
              <FormFieldRadioGroup>
                <FormFieldRadioOption
                  key="none"
                  label={t("components.filter-all")}
                  name={facet.key}
                  value=""
                  onChange={(event) => handleChange(event, facet.type)}
                />
                {facet.options?.map((option) => (
                  <FormFieldRadioOption
                    key={option.value}
                    label={option.label}
                    name={facet.key}
                    value={option.value}
                    defaultChecked={option.selected}
                    amount={option.count}
                    onChange={(event) => handleChange(event, facet.type)}
                  >
                    {option.description ? (
                      <ToolTip
                        text={option.description}
                        aria-label={t("components.info-about", {
                          subject: option.label,
                        })}
                      />
                    ) : null}
                  </FormFieldRadioOption>
                ))}
              </FormFieldRadioGroup>
            ) : null}
            {facet.type === "search-select" ? (
              <Fieldset
                aria-labelledby={`${facet.key}-title`}
                className={styles.searchSelect}
              >
                <FormFieldTextInput
                  className={styles.searchInput}
                  type="search"
                  label={
                    <Icon name="zoek-inline" aria-label="TODO: Zoek label" />
                  }
                  aria-describedby="search-help"
                  name={`search-${facet.key}`}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleInput(event, facet.key)
                  }
                >
                  <div className="sr-only" id="search-options-help">
                    {t("components.TODO-search-help")}
                  </div>
                </FormFieldTextInput>
                <FormFieldRadioGroup
                  className={clsx(
                    styles.scrollArea,
                    styles[moreState[facet.key] ? "more" : "less"],
                  )}
                >
                  {facet.options.map((option) => (
                    <FormFieldRadioOption
                      key={option.value}
                      label={option.label}
                      name={facet.key}
                      value={option.value}
                      defaultChecked={option.selected}
                      amount={option.count}
                      className={clsx(
                        !visibleValues.get(facet.key)?.has(option.value) &&
                          styles.hidden,
                      )}
                      onChange={(event) => {
                        setSelectedState((current) => ({
                          ...current,
                          [facet.key]: event.target.value,
                        }));
                        handleChange(event, facet.type);
                      }}
                    >
                      {option.description ? (
                        <ToolTip
                          text={option.description}
                          aria-label={t("components.info-about", {
                            subject: option.label,
                          })}
                        />
                      ) : null}
                    </FormFieldRadioOption>
                  ))}
                </FormFieldRadioGroup>
                {optionsState[facet.key]?.length === 0 ? (
                  <Paragraph role="status">
                    {t("components.no-options-found")}
                  </Paragraph>
                ) : null}
                {!optionsState[facet.key] &&
                facet.options.length > (facet.showTop ?? 0) ? (
                  <div className={styles.moreButton}>
                    <LinkButton
                      appearance="small"
                      onClick={(event) =>
                        toggleMore(event, facet.type, facet.key)
                      }
                    >
                      {moreState[facet.key] ? "Toon minder" : "Toon meer"}
                      <Icon
                        name="delta-naar-rechts-inline"
                        className={styles[moreState[facet.key] ? "up" : "down"]}
                        aria-hidden
                      />
                    </LinkButton>
                  </div>
                ) : null}
              </Fieldset>
            ) : null}
          </div>
        ))}
    </div>
  );
};

const TranslatedFacetFilters = (props: FacetFiltersProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <FacetFilters {...props} />
    </I18nextProvider>
  );
};

export default TranslatedFacetFilters;
