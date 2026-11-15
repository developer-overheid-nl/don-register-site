import FormFieldCheckboxGroup from "../../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../../formFieldCheckboxOption/FormFieldCheckboxOption";
import type { FilterComponentProps, MultiSelectFilterData } from "../types";
import OptionToolTip from "./OptionToolTip";

/** Checkboxes for a `multi-select` filter. */
const MultiSelectFilter = ({
  facet,
  onChange,
}: FilterComponentProps<MultiSelectFilterData>) => (
  <FormFieldCheckboxGroup>
    {facet.options?.map((option) => (
      <FormFieldCheckboxOption
        key={option.value}
        label={option.label}
        name={facet.key}
        value={option.value}
        defaultChecked={option.selected}
        amount={option.count}
        onChange={onChange}
      >
        <OptionToolTip option={option} />
      </FormFieldCheckboxOption>
    ))}
  </FormFieldCheckboxGroup>
);

export default MultiSelectFilter;
