import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { CardAsLink } from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface CardsListProps extends HTMLAttributes<HTMLOListElement> {
  /**
   * Array of items to display in the list.
   * This will encapsulate the `CardAsLink`s in `<li>` elements.
   * If not provided, the component will render its children instead and will not wrap them in `<li>` elements.
   * You can then use the `CardsListItem` component to wrap individual items.
   *
   * @type {?Array<React.JSX.Element | string>}
   */
  items?: Array<typeof CardAsLink>;
  className?: string;
}

export interface CardListPropsOLD {
  items: Array<any>;
  total?: number;
  routing?: Record<string, any>;
  i18n?: Record<string, string | Record<string, string>>;
  className?: string;
}

const CardsList = (props: PropsWithChildren<CardsListProps>) => {
  const { id, items, className, children } = props;

  return (
    <ol className={clsx(styles.cardsList, className)} id={id}>
      {items && items.length > 0
        ? items.map((item, index, array) => (
            <CardsListItem
              key={`${id || "don-cards"}_${index}`}
              index={index}
              setsize={array.length}
            >
              {item as unknown as ReactNode}
            </CardsListItem>
          ))
        : children}
    </ol>
  );
};

export interface CardsListItemProps {
  index: number;
  setsize: number;
}

export const CardsListItem = ({
  index,
  setsize,
  children,
}: PropsWithChildren<CardsListItemProps>) => (
  <li aria-posinset={index + 1} aria-setsize={setsize}>
    {children}
  </li>
);

export default CardsList;
