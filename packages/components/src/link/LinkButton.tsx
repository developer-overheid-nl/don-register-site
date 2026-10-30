import {
  LinkButton as RHCLinkButton,
  type LinkButtonProps as RHCLinkButtonProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface LinkButtonProps extends RHCLinkButtonProps {
  /**
   * Visual size variant; `small` removes the block padding and uses a smaller font size.
   */
  appearance?: "small";
}

/**
 * A button that looks like a link, for actions on the current page.
 */
const LinkButton = ({ appearance, className, ...props }: LinkButtonProps) => {
  return (
    <RHCLinkButton
      {...props}
      className={clsx(
        styles.linkButton,
        appearance && styles[appearance],
        className,
      )}
    />
  );
};

export default LinkButton;
