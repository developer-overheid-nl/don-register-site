import {
  CardAsLink as RHCCardAsLink,
  type CardAsLinkProps as RHCCardAsLinkProps,
} from "@rijkshuisstijl-community/card-as-link-react/no-side-effects";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface CardAsLinksProps extends RHCCardAsLinkProps {}

const CardAsLink = (props: CardAsLinksProps) => {
  const { className, ...restProps } = props;

  return (
    <RHCCardAsLink
      className={clsx(className, styles.cardAsLink)}
      {...restProps}
    />
  );
};

export default CardAsLink;
