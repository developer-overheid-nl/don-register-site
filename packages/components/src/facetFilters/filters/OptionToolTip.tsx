import { useTranslation } from "react-i18next";
import ToolTip from "../../toolTip/ToolTip";
import type { SelectOption } from "../types";

export interface OptionToolTipProps {
  option: SelectOption;
}

/** Info tooltip for a filter option; renders nothing without a description. */
const OptionToolTip = ({ option }: OptionToolTipProps) => {
  const { t } = useTranslation();

  return option.description ? (
    <ToolTip
      text={option.description}
      aria-label={t("components.info-about", { subject: option.label })}
    />
  ) : null;
};

export default OptionToolTip;
