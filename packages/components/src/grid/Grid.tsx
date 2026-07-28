import clsx from "clsx";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  minColumnWidth?: string;
  gap?: "none" | "small" | "medium" | "large";
  children: ReactNode;
}

const getGapClass = (gap: NonNullable<GridProps["gap"]>): string => {
  switch (gap) {
    case "none":
      return styles.gapNone;
    case "small":
      return styles.gapSmall;
    case "large":
      return styles.gapLarge;
    default:
      return styles.gapMedium;
  }
};

const Grid = ({
  minColumnWidth = "8rem",
  gap = "medium",
  className,
  style,
  children,
  ...restProps
}: GridProps) => {
  return (
    <div
      className={clsx(styles.grid, getGapClass(gap), className)}
      style={
        {
          "--grid-min-column-width": minColumnWidth,
          ...style,
        } as CSSProperties
      }
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Grid;
