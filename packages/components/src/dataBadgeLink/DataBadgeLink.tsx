import {
  DataBadgeButton,
  type DataBadgeButtonProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface DataBadgeLinkProps
  extends Omit<DataBadgeButtonProps, "aria-pressed" | "pressed"> {
  href: string;
  children: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  className?: string;
  role?: string;
  appearance?: "primary" | "outlined" | "subtle";
}

const DataBadgeLink = (props: DataBadgeLinkProps) => {
  const {
    href,
    target,
    rel,
    children,
    className,
    role,
    appearance = "primary",
    ...restProps
  } = props;
  return (
    <DataBadgeButton
      className={clsx(className, styles.donDataBadge, styles[appearance])}
      /* biome-ignore lint/a11y/useValidAriaValues: {null} is needed to remove it */
      aria-pressed={undefined}
      role={role}
      {...restProps}
    >
      <a
        className={clsx(styles.badgeLink)}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </DataBadgeButton>
  );
};

export default DataBadgeLink;
