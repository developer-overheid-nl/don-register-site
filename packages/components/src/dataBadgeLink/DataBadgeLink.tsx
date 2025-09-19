import { DataBadgeButton, type DataBadgeButtonProps } from "@rijkshuisstijl-community/components-react";
import styles from "./styles.module.css";
import clsx from "clsx";

export interface DataBadgeLinkProps extends Omit<DataBadgeButtonProps, 'aria-pressed' | 'pressed'> {
  href: string;
  children: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  className: string;
  role?: string;
}

const DataBadgeLink = (props: DataBadgeLinkProps) => {
  const { href, target, rel, children, className, role, ...restProps } = props;
  return (
    <DataBadgeButton className={clsx(className, styles.donDataBadge)} aria-pressed={null} {...restProps}>
      <a className={clsx(styles.badgeLink)} href={href} target={target} rel={rel} role={role}>{children}</a>
    </DataBadgeButton>
  );
}

export default DataBadgeLink;
