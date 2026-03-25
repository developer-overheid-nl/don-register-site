import clsx from "clsx";
import type { HTMLProps, PropsWithChildren } from "react";
import FormFieldCheckboxGroup from "../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldRadioGroup from "../formFieldRadioGroup/FormFieldRadioGroup";
import FormFieldRadioOption from "../formFieldRadioOption/FormFieldRadioOption";
import Heading, {
  clampHeadingLevel,
  type HeadingProps,
} from "../heading/Heading";
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

export interface FacetFiltersProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  startHeadingLevel?: HeadingProps["level"];
  filters: FilterData[] | null | undefined;
}

const FacetFilters = (props: PropsWithChildren<FacetFiltersProps>) => {
  const { title, startHeadingLevel = 2, filters } = props;

  return (
    <div className={clsx([styles.facetFilters, props.className])}>
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
              className={styles.facetHeading}
            >
              {facet.label}
            </Heading>
            <Paragraph purpose="short">{facet.description}</Paragraph>
            {facet.type === "toggle" ? (
              <FormFieldCheckboxOption
                label="JA"
                name={facet.key}
                defaultChecked={facet.value}
                value="true"
                amount={facet.count || 0}
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
                  >
                    {option.description ? (
                      <ToolTip text={option.description} />
                    ) : null}
                  </FormFieldCheckboxOption>
                ))}
              </FormFieldCheckboxGroup>
            ) : null}
            {facet.type === "single-select" ? (
              <FormFieldRadioGroup>
                {facet.options?.map((option) => (
                  <FormFieldRadioOption
                    key={option.value}
                    label={option.label}
                    name={facet.key}
                    value={option.value}
                    defaultChecked={option.selected}
                    amount={option.count}
                  />
                ))}
              </FormFieldRadioGroup>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default FacetFilters;
