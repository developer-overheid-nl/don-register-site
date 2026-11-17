"use client";

import clsx from "clsx";
import {
  type ChangeEvent,
  type HTMLProps,
  type PropsWithChildren,
  useRef,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";
import Heading, {
  clampHeadingLevel,
  type HeadingProps,
} from "../heading/Heading";
import i18n from "../i18n";
import Paragraph from "../paragraph/Paragraph";
import MultiSelectFilter from "./filters/MultiSelectFilter";
import SearchSelectFilter from "./filters/SearchSelectFilter";
import SingleSelectFilter from "./filters/SingleSelectFilter";
import ToggleFilter from "./filters/ToggleFilter";
import { getSelectedFilters, updateFilters } from "./selectedFilters";
import styles from "./styles.module.css";
import { type FilterData, FilterType, type SelectedFilters } from "./types";

export { getSelectedFilters, getSelectedFiltersMap } from "./selectedFilters";
export type { FilterData, SelectOption } from "./types";

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
  const thisRef = useRef<HTMLDivElement>(null);
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

  // Selection as changed by the user; starts over whenever new filter data comes in
  const [selectedFilters, setSelectedFilters] = useState(() =>
    getSelectedFilters(filters),
  );
  const [previousFilters, setPreviousFilters] = useState(filters);
  if (previousFilters !== filters) {
    setPreviousFilters(filters);
    setSelectedFilters(getSelectedFilters(filters));
  }

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
      type,
    );
    setSelectedFilters(newSelectedFilters);

    if (debounceTypes.includes(type)) {
      debouncedEmitChange(newSelectedFilters);
    } else {
      emitChange(newSelectedFilters);
    }
  };

  const renderFilter = (facet: FilterData) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) =>
      handleChange(event, facet.type);

    switch (facet.type) {
      case FilterType.Toggle:
        return (
          <ToggleFilter
            facet={facet}
            explicit={explicitFalseFilters?.includes(facet.key)}
            onChange={onChange}
          />
        );
      case FilterType.Multi:
        return <MultiSelectFilter facet={facet} onChange={onChange} />;
      case FilterType.Single:
        return <SingleSelectFilter facet={facet} onChange={onChange} />;
      // `search-select` is deprecated and handled as `search-single-select`
      case FilterType.SearchSingle:
      case FilterType.Search:
        return <SearchSelectFilter facet={facet} onChange={onChange} />;
      case FilterType.SearchMulti:
        return (
          <SearchSelectFilter facet={facet} multiple onChange={onChange} />
        );
      default:
        return null;
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
      {/* Temporary filter on `date` types; TODO: Date selector */}
      {filters
        ?.filter(({ type }) => type !== FilterType.Date)
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
            {renderFilter(facet)}
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
