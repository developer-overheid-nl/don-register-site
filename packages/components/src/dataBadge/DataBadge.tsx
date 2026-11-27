import type { DataBadgeProps as UtrechtDataBadgeProps } from "@utrecht/data-badge-react";
import { DataBadge as UtrechtDataBadge } from "@utrecht/data-badge-react";
import clsx from "clsx";
import styles from "./styles.module.css";

/** Visual style of a data badge. */
export type DataBadgeAppearance =
  | "primary"
  | "outlined"
  | "subtle"
  | "link"
  | "error"
  | "warning"
  | "hint";

export interface DataBadgeProps extends UtrechtDataBadgeProps {
  /** Visual style of the badge. */
  appearance?: DataBadgeAppearance;
}

/** A short, non-interactive value or status. Shares its styling with `DataBadgeLink`. */
const DataBadge = ({
  appearance = "primary",
  className,
  ...restProps
}: DataBadgeProps) => (
  <UtrechtDataBadge
    className={clsx(className, styles.donDataBadge, styles[appearance])}
    {...restProps}
  />
);

export default DataBadge;
