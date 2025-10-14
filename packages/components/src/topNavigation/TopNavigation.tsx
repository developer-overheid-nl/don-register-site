import type { ReactElement } from "react";
import styles from "./styles.module.css";
import { NavBar, type NavBarItemProps, type IconProps } from "@rijkshuisstijl-community/components-react";
import Icon from "../iconsSprite/Icon";

export interface NavBarItem {
  id: string;
  label: string;
  href: string;
  current?: boolean;
  icon?: string | ReactElement<IconProps>;
}

export interface TopNavigationProps {
  items: Array<NavBarItem>;
  endItems?: Array<NavBarItem>;
}

const processIcon = (icon: NavBarItem["icon"]): ReactElement<IconProps> | undefined => {
  if (typeof icon === "string") {
    switch (icon) {
      case "_add":
        return <Icon name="plus-cirkel-inline" />;
      case "_external":
        return <Icon name="externe-link-inline" aria-label={`Externe link naar`} />;
    }
  } else {
    return icon;
  }
} 

export const processNavBarItems = (items: Array<NavBarItem>): NavBarItemProps[] => {
  return items.map(item => ({
    ...item,
    bold: item.current,
    icon: processIcon(item.icon),
  }));
}

export default function TopNavigation({ items, endItems }: TopNavigationProps) {
  const processedItems = processNavBarItems(items);
  const processedEndItems = endItems && processNavBarItems(endItems);

  return (
    <div className={styles.container}>
      <NavBar items={processedItems} endItems={processedEndItems} className={styles.navbar} />
    </div>
  );
}
