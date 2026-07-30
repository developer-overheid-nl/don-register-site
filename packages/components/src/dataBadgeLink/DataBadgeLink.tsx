import {
  DataBadgeButton,
  type DataBadgeButtonProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

/** A data badge that acts as a link instead of a toggle button. */
export interface DataBadgeLinkProps
  extends Omit<DataBadgeButtonProps, "aria-pressed" | "pressed"> {
  /** The link target. */
  href: string;
  /** The badge's content. */
  children: React.ReactNode;
  /** The anchor's `target` attribute. */
  target?: React.HTMLAttributeAnchorTarget;
  /** The anchor's `rel` attribute. */
  rel?: string;
  className?: string;
  role?: string;
  /** Visual style of the badge. */
  appearance?: "primary" | "outlined" | "subtle" | "link";
}

const DataBadgeLink = (props: DataBadgeLinkProps) => {
  const {
    href,
    target,
    rel,
    children,
    className,
    role,
    tabIndex = undefined,
    appearance = "primary",
    ...restProps
  } = props;
  return (
    <DataBadgeButton
      className={clsx(className, styles.donDataBadge, styles[appearance])}
      /* biome-ignore lint/a11y/useValidAriaValues: {null} is needed to remove it */
      aria-pressed={undefined}
      role={role}
      /* RHC DataBadgeButton had a tabindex=0 on the span, and a focus ring, but no interaction */
      tabIndex={tabIndex}
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
