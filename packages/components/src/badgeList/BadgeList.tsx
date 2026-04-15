import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./styles.module.css";

export interface BadgeListProps extends HTMLAttributes<HTMLUListElement> {
  direction?: "row" | "column";
}

const BadgeList = (props: BadgeListProps) => {
  const { direction = "row", className, children, ...restProps } = props;

  return (
    <ul
      className={clsx(
        styles.badgelist,
        styles[`badgelist--${direction}`],
        className,
      )}
      {...restProps}
    >
      {children}
    </ul>
  );
};

export default BadgeList;
