import clsx from "clsx";
import type { ButtonHTMLAttributes, HTMLProps } from "react";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

export interface InfoButtonProps extends HTMLProps<HTMLButtonElement> {
  iconSize?: "small" | "default" | "large";
  iconColor?: "default" | "current";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  commandfor?: string;
  command?:
    | "show-modal"
    | "close"
    | "request-close"
    | "show-popover"
    | "hide-popover"
    | "toggle-popover"
    | `--${string}`;
  interestfor?: string;
}

const InfoButton = (props: InfoButtonProps) => {
  const {
    iconSize = "default",
    iconColor = "default",
    type = "button",
    ...restProps
  } = props;

  return (
    <button
      className={clsx(
        styles.infoButton,
        styles[`${iconSize}Size`],
        styles[`${iconColor}Color`],
      )}
      type={type}
      {...restProps}
    >
      <Icon name="info" />
    </button>
  );
};

export default InfoButton;
