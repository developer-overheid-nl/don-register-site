import clsx from "clsx";
import type { ReactNode } from "react";
import Button, { type ButtonProps } from "../button/Button";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

export interface DropdownButtonProps extends ButtonProps {
  dropdown: ReactNode;
  className?: string;
}

const DropdownButton = (props: DropdownButtonProps) => {
  const {
    appearance = "primary-action-button",
    className,
    dropdown,
    children,
  } = props;

  return (
    <>
      <Button
        type="button"
        appearance={appearance}
        className={clsx(styles.dropdownButton, className)}
      >
        {children}
        <span className={styles.spacer} aria-hidden></span>
        <Icon name="delta-omlaag-inline" />
      </Button>
      <div>{dropdown}</div>
    </>
  );
};

export default DropdownButton;
