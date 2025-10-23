import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";

export interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  appearance?: "clear" | "outlined" | "filled";
  layout?: "full" | "flex-row" | "flex-col";
}

const Block = (props: BlockProps) => {
  const {
    className,
    appearance = "filled",
    layout = "full",
    ...restProps
  } = props;

  return (
    <div
      className={clsx([
        styles.block,
        className,
        styles[appearance],
        styles[layout],
      ])}
      {...restProps}
    >
      {props.children}
    </div>
  );
};

export default Block;
