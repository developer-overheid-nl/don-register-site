import {
  Paragraph as RHCParagraph,
  type ParagraphProps as RHCParagraphProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface ParagraphProps extends RHCParagraphProps {
  purpose?: "lead" | "short";
}

const Paragraph = (props: ParagraphProps) => {
  const { className, purpose } = props;

  return (
    <RHCParagraph
      className={clsx(className, purpose === "short" && styles.short)}
      purpose={purpose}
      {...props}
    />
  );
};

export default Paragraph;
