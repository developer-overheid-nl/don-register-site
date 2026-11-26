import { useTranslation } from "react-i18next";
import FormFieldSwitch from "../../formFieldSwitch/FormFieldSwitch";
import type { FilterComponentProps, ToggleFilterData } from "../types";

export interface ToggleFilterProps
  extends FilterComponentProps<ToggleFilterData> {
  /** Render separate on/off options, so "off" is submitted as an explicit `false`. */
  explicit?: boolean;
}

/** On/off switch for a `toggle` filter. */
const ToggleFilter = ({ facet, explicit, onChange }: ToggleFilterProps) => {
  const { t } = useTranslation();

  return (
    <FormFieldSwitch
      label=""
      labelledById={`${facet.key}-label`}
      name={facet.key}
      explicit={explicit}
      defaultChecked={facet.value}
      value={explicit ? ["true", "false"] : "true"}
      amount={facet.count || 0}
      labels={{
        on: t("components.filter-on"),
        off: t("components.filter-off"),
      }}
      onChange={onChange}
    />
  );
};

export default ToggleFilter;
