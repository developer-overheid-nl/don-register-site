import {
  TextInput,
  type TextInputProps,
} from "@rijkshuisstijl-community/components-react";
import { clsx } from "clsx";
import styles from "./styles.module.css";

const ReadOnlyTextInput = (props: TextInputProps) => {
  const { className, ...restProps } = props;

  return (
    <TextInput
      readOnly
      className={clsx(styles.input, className)}
      {...restProps}
    />
  );
};

export default ReadOnlyTextInput;
