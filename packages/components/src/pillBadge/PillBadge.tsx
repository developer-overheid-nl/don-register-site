import clsx from "clsx";
import type { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export interface PillBadgeProps {
  className?: string;
  /** Text on the start-side of the pill */
  startValue: string | number | null | undefined;
  /** Text on the end-side of the pill */
  endValue: string | number | null | undefined;
  /** Figure Caption text */
  caption?: string;
  /** Type of Pill badge
   * @default color
   */
  type?: "color" | "percentage";
  /** Color of the end-side of the pill
   * @default lichtgroen
   */
  color?: string; // todo: enum
}

const PillBadge = (props: PropsWithChildren<PillBadgeProps>) => {
  const {
    className,
    startValue,
    endValue,
    caption,
    type = "color",
    color,
    children,
    ...restProps
  } = props;

  return (
    <figure
      className={clsx(styles["pill-badge-figure"], className)}
      {...restProps}
    >
      <div
        className={clsx(
          styles["pill-badge"],
          type === "percentage" && styles["pill-badge--type-percentage"],
        )}
        data-percentage={type === "percentage" ? endValue : undefined}
        data-color={color}
      >
        <span className={styles["pill-badge__start"]}>{startValue || "■"}</span>
        <span className={styles["pill-badge__end"]}>
          {endValue || "-"}
          {type === "percentage" ? "%" : ""}
        </span>
      </div>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default PillBadge;
