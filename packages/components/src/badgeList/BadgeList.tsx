import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./styles.module.css";

export interface BadgeListProps extends HTMLAttributes<HTMLUListElement> {
  direction?: "row" | "column";
  table?: boolean;
}

const BadgeList = (props: BadgeListProps) => {
  const {
    direction = "row",
    table = false,
    className,
    children,
    ...restProps
  } = props;

  return (
    <ul
      className={clsx(
        styles.badgelist,
        styles[`badgelist--${direction}`],
        table && styles[`badgelist--table`],
        className,
      )}
      {...restProps}
    >
      {children}
    </ul>
  );
};

export default BadgeList;
