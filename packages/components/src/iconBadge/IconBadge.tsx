import type { HTMLProps } from "react";
import Icon from "../iconsSprite/Icon";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface IconBadgeProps extends HTMLProps<HTMLSpanElement> {
  name: string;
  appearance?: string;
}

export default function IconBadge (props : IconBadgeProps) {
  const { className, name, appearance, ...restProps } = props;
  const iconClassName = `don-icon don-icon-${name} ${className || ''}`.trim();
  
  return (
    <span className={clsx('utrecht-data-badge', `utrecht-data-badge--${appearance || name}`, styles)} {...restProps}>
      <Icon width="1.5rem" height="1.5rem" className={`${iconClassName}`} name={name} />
    </span>
  );
}