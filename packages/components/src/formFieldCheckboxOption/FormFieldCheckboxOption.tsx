import {
  FormFieldCheckboxOption as RHCFormFieldCheckboxOption,
  type FormFieldCheckboxOptionProps as RHCFormFieldCheckboxOptionProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import AmountLabel, { type AmountLabelProps } from "../amountLabel/AmountLabel";
import styles from "./styles.module.css";

export interface FormFieldCheckboxOptionProps
  extends Omit<RHCFormFieldCheckboxOptionProps, "label">,
    AmountLabelProps {}

const FormFieldCheckboxOption = (props: FormFieldCheckboxOptionProps) => {
  const { amount, label, className, children, ...restProps } = props;
  return (
    <RHCFormFieldCheckboxOption
      className={clsx(styles.checkbox, className)}
      label={<AmountLabel label={label} amount={amount} />}
      {...restProps}
    >
      <span className={styles.info}>{children}</span>
    </RHCFormFieldCheckboxOption>
  );
};

export default FormFieldCheckboxOption;
