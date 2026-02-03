import {
  TextInput,
  type TextInputProps,
} from "@rijkshuisstijl-community/components-react";
import { clsx } from "clsx";
import styles from "./styles.module.css";

interface ReadOnlyTextInputProps extends TextInputProps {
  fontVariant?: "slashed-zero" | "monospace" | "normal";
}

const ReadOnlyTextInput = (props: ReadOnlyTextInputProps) => {
  const { className, fontVariant = "normal", ...restProps } = props;

  return (
    <TextInput
      readOnly
      className={clsx(styles.input, styles[fontVariant], className)}
      {...restProps}
    />
  );
};

export default ReadOnlyTextInput;
