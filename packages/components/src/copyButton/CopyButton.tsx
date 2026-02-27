"use client";

import { SecondaryActionButton } from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const CopyButton = ({
  text,
  className,
  ...restProps
}: CopyButtonProps) => {
  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(
        text || "Sorry, no text to copy was set...",
      );
    } else {
      console.warn("Clipboard API not supported");
    }
  };

  return (
    text && (
      <SecondaryActionButton
        className={clsx([className, styles.button])}
        onClick={handleCopy}
        title="Kopieer naar klembord"
        aria-label="Kopieer naar klembord"
        {...restProps}
      >
        <Icon className={styles.icon} name="kopieer-inline" />
      </SecondaryActionButton>
    )
  );
};

export default CopyButton;
