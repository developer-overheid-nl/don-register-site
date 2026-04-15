"use client";

import clsx from "clsx";
import type { ChangeEvent } from "react";
import { type HTMLProps, type PropsWithChildren, useRef } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import FormFieldCheckboxGroup from "../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldRadioGroup from "../formFieldRadioGroup/FormFieldRadioGroup";
import FormFieldRadioOption from "../formFieldRadioOption/FormFieldRadioOption";
import FormFieldSwitch from "../formFieldSwitch/FormFieldSwitch";
import Heading, {
  clampHeadingLevel,
  type HeadingProps,
} from "../heading/Heading";
import i18n from "../i18n";
import Paragraph from "../paragraph/Paragraph";
import ToolTip from "../toolTip/ToolTip";
import styles from "./styles.module.css";

// type StringOrBooleanStringType<T extends string | boolean> = T extends string
//   ? string
//   : "true" | "false";

enum FilterType {
  Toggle = "toggle",
  Date = "date",
  Multi = "multi-select",
  Single = "single-select",
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string | null;
  count: number;
  selected: boolean; // StringOrBooleanStringType<boolean>;
}

interface BaseFilterItems {
  key: string;
  label: string;
  description: string;
}

interface ToggleFilterData extends BaseFilterItems {
  type: FilterType.Toggle;
  value?: boolean; //StringOrBooleanStringType<boolean>;
  count?: number;
}

interface DateFilterData extends BaseFilterItems {
  type: FilterType.Date;
  value?: string; //StringOrBooleanStringType<string>;
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

export type FilterData =
  | ToggleFilterData
  | DateFilterData
  | MultiSelectFilterData
  | SingleSelectFilterData;

type SelectedFilters = Record<string, Array<string | [string, string]>>;

export interface FacetFiltersProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  startHeadingLevel?: HeadingProps["level"];
  filters: FilterData[] | null | undefined;
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
        acc[filter.key] = withLabels ? [["true", filter.label]] : ["true"];
      } else if (filter.type === FilterType.Date && filter.value) {
        acc[filter.key] = withLabels
          ? [[filter.value, filter.label]]
          : [filter.value];
      } else if (filter.type === FilterType.Single) {
        const selectedOption = filter.options.find((option) => option.selected);
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

const updateFilters = (
  selectedFilters: SelectedFilters,
  filterKey: string,
  filterValue: string,
  checked: boolean,
) => {
  const newSelectedFilters = {
    ...selectedFilters,
    [filterKey]: checked
      ? [...(selectedFilters[filterKey] || []), filterValue]
      : (selectedFilters[filterKey] || []).filter(
          (value) => value !== filterValue,
        ),
  };
  return newSelectedFilters;
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
  const {
    title,
    startHeadingLevel = 2,
    filters,
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
  ) => {
    const newSelectedFilters = updateFilters(
      selectedFilters,
      event.target.name,
      event.target.value,
      event.target.checked,
    );

    if (debounceTypes.includes(type)) {
      debouncedEmitChange(newSelectedFilters);
    } else {
      emitChange(newSelectedFilters);
    }
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
                defaultChecked={facet.value}
                value="true"
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
                  />
                ))}
              </FormFieldRadioGroup>
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
