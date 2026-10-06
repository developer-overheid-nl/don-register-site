import {
  ButtonLink,
  type ButtonLinkProps,
} from "@rijkshuisstijl-community/components-react";
import Icon from "../iconsSprite/Icon";

export interface ButtonActionProps extends ButtonLinkProps {
  /**
   * Visual weight of the call to action. Defaults to the primary action
   * appearance, so the link stands out as the main action on the page.
   */
  appearance?:
    | "primary-action-button"
    | "secondary-action-button"
    | "subtle-button";
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
    icon,
    iconEnd = "delta-naar-rechts-inline",
    children,
    ...restProps
  } = props;

  return (
    <ButtonLink appearance={appearance} {...restProps}>
      {icon && <Icon name={icon} aria-hidden />}
      {children}
      {iconEnd && <Icon name={iconEnd} aria-hidden />}
    </ButtonLink>
  );
};

export default ButtonAction;
