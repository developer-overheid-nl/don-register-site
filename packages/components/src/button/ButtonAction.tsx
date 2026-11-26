import {
  ButtonLink,
  type ButtonLinkProps,
} from "@rijkshuisstijl-community/button-react/no-side-effects";
import clsx from "clsx";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

export interface ButtonActionProps extends Omit<ButtonLinkProps, "appearance"> {
  /**
   * Visual weight of the call to action. Defaults to the primary action
   * appearance, so the link stands out as the main action on the page.
   * Use `inline-button` for an action that sits inline in running text.
   */
  appearance?:
    | "primary-action-button"
    | "secondary-action-button"
    | "subtle-button"
    | "inline-button";
  /**
   * Name of an icon in the sprite (without the `icon-` prefix), rendered
   * before the label, e.g. `plus-cirkel-inline`.
   */
  icon?: string;
  /**
   * Name of an icon in the sprite (without the `icon-` prefix), rendered
   * after the label. Defaults to `delta-naar-rechts-inline`; pass `false`
   * to render no icon.
   */
  iconEnd?: string | false;
}

/**
 * A link styled as a button, used as a call to action (e.g. "API toevoegen").
 * Use this instead of `Button` when the action navigates to another page.
 */
const ButtonAction = (props: ButtonActionProps) => {
  const {
    appearance = "primary-action-button",
    className,
    icon,
    iconEnd = "delta-naar-rechts-inline",
    children,
    ...restProps
  } = props;

  return (
    <ButtonLink
      appearance={
        appearance === "inline-button" ? "secondary-action-button" : appearance
      }
      className={clsx(
        className,
        appearance === "inline-button" && styles.inlineButton,
      )}
      {...restProps}
    >
      {icon && <Icon name={icon} aria-hidden />}
      {children}
      {iconEnd && <Icon name={iconEnd} aria-hidden />}
    </ButtonLink>
  );
};

export default ButtonAction;
