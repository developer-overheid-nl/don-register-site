import clsx from "clsx";
import styles from "./styles.module.css";

export interface PillBadgeProps {
  className?: string;
  startValue: string | number | null | undefined;
  endValue: string | number | null | undefined;
  type?: "color" | "percentage";
}

const PillBadge = (props: PillBadgeProps) => {
  const {
    className,
    startValue,
    endValue,
    type = "color",
    ...restProps
  } = props;

  return (
    <div
      className={clsx(
        styles["pill-badge"],
        type === "percentage" && styles["pill-badge--type-percentage"],
        className,
      )}
      data-percentage={type === "percentage" ? endValue : undefined}
      {...restProps}
    >
      <span className={styles["pill-badge__start"]}>{startValue || "■"}</span>
      <span className={styles["pill-badge__end"]}>
        {endValue || "-"}
        {type === "percentage" ? "%" : ""}
      </span>
    </div>
  );
};

export default PillBadge;
