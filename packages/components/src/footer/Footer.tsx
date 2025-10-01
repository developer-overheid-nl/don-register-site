import { LinkList, LinkListLink, Footer as RHCFooter, type HeadingLevel} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type { PropsWithChildren, ReactNode } from "react";
import Markdown from "../markdown/Markdown";
import Icon from "../iconsSprite/Icon";
import Heading from "../heading/Heading";
import { processNavBarItems, type NavBarItem } from "../topNavigation/TopNavigation";

// interface LinkItem {
//   id: string;
//   label: string;
//   href: string;
//   icon: string | ReactNode;
// }
export interface ColumnProps {
  title: string;
  items?: NavBarItem[];
  text?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  columns?: ColumnProps[]
}

// TODO: refactor icons together with TopNavigation
const FooterColumns = (props: ColumnProps) => {
  const { title, items, text } = props;
  const processedItems = items &&  processNavBarItems(items);

  return (
    <div className={styles.column}>
      <Heading level={2} appearanceLevel={5}>{title}</Heading>
      {text && <Markdown>{text}</Markdown>}
      {processedItems && (
        <LinkList>
          {processedItems.map((item, index) => (
            <LinkListLink
              key={item.id || index}
              href={item.href}
              icon={item.icon}
            >{item.label}</LinkListLink>
          ))}
        </LinkList>
      )}
    </div>
  )
}

const Footer = (props : PropsWithChildren<FooterProps>) => {
  const { className, columns, children, ...restProps } = props;
  const columnsClass = `numColumns${Math.min(Number(columns?.length), 4)}`;

  return (
    /* @ts-expect-error className is not exposed */
    <RHCFooter className={clsx(className, styles.footer, styles[columnsClass])} background="primary-outlined" preFooter {...restProps}>
      {columns && columns.length > 0 && columns.map((column, index) => (
        <FooterColumns key={column.title || index} {...column} />
      ))}
    </RHCFooter>
  );
};

export default Footer;
