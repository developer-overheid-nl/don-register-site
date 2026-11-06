import {
  Paragraph as RHCParagraph,
  type ParagraphProps as RHCParagraphProps,
} from "@rijkshuisstijl-community/paragraph-react/no-side-effects";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface ParagraphProps extends Omit<RHCParagraphProps, "purpose"> {
  /** `lead` is handled by RHC; `short` is a local variant with its own styling. */
  purpose?: "lead" | "short";
}

const Paragraph = (props: ParagraphProps) => {
  const { className, purpose, ...restProps } = props;

  return (
    <RHCParagraph
      className={clsx(className, purpose === "short" && styles.short)}
      purpose={purpose === "lead" ? purpose : undefined}
      {...restProps}
    />
  );
};

export default Paragraph;
