import {
  FormFieldCheckboxOption as RHCFormFieldCheckboxOption,
  type FormFieldCheckboxOptionProps as RHCFormFieldCheckboxOptionProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface FormFieldCheckboxOptionProps
  extends RHCFormFieldCheckboxOptionProps {
  amount: string;
}

const AmountLabel = ({
  label,
  amount,
}: {
  label: FormFieldCheckboxOptionProps["label"];
  amount: string;
}) => (
  <>
    <span>{label}</span>&nbsp;
    <span className={styles.amountLabel}>({amount})</span>
  </>
);

const FormFieldCheckboxOption = (props: FormFieldCheckboxOptionProps) => {
  const { amount, label, className, ...restProps } = props;
  return (
    <RHCFormFieldCheckboxOption
      className={clsx(styles.checkbox, className)}
      label={<AmountLabel label={label} amount={amount} />}
      {...restProps}
    />
  );
};

export default FormFieldCheckboxOption;
