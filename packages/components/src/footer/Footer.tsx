import {
  LinkList,
  LinkListLink,
  Footer as RHCFooter,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import { type PropsWithChildren, useId } from "react";
import Heading from "../heading/Heading";
import Markdown from "../markdown/Markdown";
import {
  type NavBarItem,
  processNavBarItems,
} from "../topNavigation/TopNavigation";
import styles from "./styles.module.css";

export interface ColumnProps {
  title: string;
  items?: NavBarItem[];
  text?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  columns?: ColumnProps[];
}

// TODO: refactor icons together with TopNavigation
const FooterColumns = (props: ColumnProps) => {
  const id = useId();
  const { title, items, text } = props;
  const processedItems = items && processNavBarItems(items);

  return (
    <nav className={styles.column} aria-describedby={id}>
      <Heading level={2} appearanceLevel={5} id={id}>
        {title}
      </Heading>
      {text && <Markdown>{text}</Markdown>}
      {processedItems && (
        <LinkList>
          {processedItems.map((item, index) => (
            <LinkListLink
              key={item.id || index}
              href={item.href}
              icon={item.icon}
            >
              {item.label}
            </LinkListLink>
          ))}
        </LinkList>
      )}
    </nav>
  );
};

const Footer = (props: PropsWithChildren<FooterProps>) => {
  const { className, columns, ...restProps } = props;
  const columnsClass = `numColumns${Math.min(Number(columns?.length), 4)}`;

  return (
    <RHCFooter
      className={clsx(className, styles.footer, styles[columnsClass])}
      background="primary-outlined"
      preFooter
      {...restProps}
    >
      {columns &&
        columns.length > 0 &&
        columns.map((column, index) => (
          <FooterColumns key={column.title || index} {...column} />
        ))}
    </RHCFooter>
  );
};

export default Footer;
