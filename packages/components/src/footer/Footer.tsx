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

/** A column in the footer, with a title and optional text and/or links. */
export interface ColumnProps {
  /** Title of the column, shown as a heading. */
  title: string;
  /** Navigation links, shown as a list below the title. */
  items?: NavBarItem[];
  /** Markdown text, shown below the title (e.g. for sponsor logos). */
  text?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  /** Columns with a title, text and/or links, shown in the footer. */
  columns?: ColumnProps[];
}

// TODO: refactor icons together with TopNavigation
const FooterColumns = (props: ColumnProps) => {
  const id = useId();
  const { title, items, text } = props;
  const processedItems = items && processNavBarItems(items);

  return (
    <nav className={styles.column} aria-labelledby={id}>
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
