import { useTranslation } from "react-i18next";
import FormFieldRadioGroup from "../../formFieldRadioGroup/FormFieldRadioGroup";
import FormFieldRadioOption from "../../formFieldRadioOption/FormFieldRadioOption";
import type { FilterComponentProps, SingleSelectFilterData } from "../types";
import OptionToolTip from "./OptionToolTip";

/** Radio buttons for a `single-select` filter, with an "all" option to clear it. */
const SingleSelectFilter = ({
  facet,
  onChange,
}: FilterComponentProps<SingleSelectFilterData>) => {
  const { t } = useTranslation();

  return (
    <FormFieldRadioGroup>
      <FormFieldRadioOption
        key="none"
        label={t("components.filter-all")}
        name={facet.key}
        value=""
        onChange={onChange}
      />
      {facet.options?.map((option) => (
        <FormFieldRadioOption
          key={option.value}
          label={option.label}
          name={facet.key}
          value={option.value}
          defaultChecked={option.selected}
          amount={option.count}
          onChange={onChange}
        >
          <OptionToolTip option={option} />
        </FormFieldRadioOption>
      ))}
    </FormFieldRadioGroup>
  );
};

export default SingleSelectFilter;
