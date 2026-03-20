import {
  FormFieldCheckboxOption as RHCFormFieldCheckboxOption,
  type FormFieldCheckboxOptionProps as RHCFormFieldCheckboxOptionProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface FormFieldCheckboxOptionProps
  extends RHCFormFieldCheckboxOptionProps {
  amount: string | number;
}

const AmountLabel = ({ label, amount }: FormFieldCheckboxOptionProps) => (
  <div className={styles.amountLabel}>
    <span className={styles.labelText}>{label}</span>&nbsp;
    <span className={styles.amountText}>({amount})</span>
  </div>
);

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
