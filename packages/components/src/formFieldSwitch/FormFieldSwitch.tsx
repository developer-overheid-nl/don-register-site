import {
  type CustomFormFieldProps,
  FormField,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import { useId } from "react";
import AmountLabel, { type AmountLabelProps } from "../amountLabel/AmountLabel";
import Switch, { type SwitchLabels } from "../switch/Switch";
import styles from "./styles.module.css";

export interface FormFieldSwitchProps
  extends Omit<
      CustomFormFieldProps,
      "label" | "statusId" | "errorMessageId" | "descriptionId" | "input"
    >,
    AmountLabelProps {
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  statusId?: CustomFormFieldProps["statusId"];
  errorMessageId?: CustomFormFieldProps["errorMessageId"];
  descriptionId?: CustomFormFieldProps["descriptionId"];
  labelledById?: string;
  labels?: SwitchLabels;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormFieldSwitch = (props: FormFieldSwitchProps) => {
  const genId = useId();
  const {
    id = genId,
    statusId = genId,
    errorMessageId = genId,
    descriptionId = genId,
    labelledById,
    name,
    value,
    defaultChecked,
    checked,
    amount,
    label,
    labels,
    onChange,
    className,
    children,
    ...restProps
  } = props;

  return (
    <FormField
      id={id}
      type="checkbox"
      className={clsx("utrecht-form-field--checkbox", styles.switch, className)}
      statusId={statusId}
      errorMessageId={errorMessageId}
      descriptionId={descriptionId}
      label={<AmountLabel label={label} amount={amount} />}
      input={
        <Switch
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          className="utrecht-form-field__input"
          labels={labels}
          aria-labelledby={`${labelledById} ${id}`}
          onChange={onChange}
        />
      }
      {...restProps}
    >
      <span className={styles.info}>{children}</span>
    </FormField>
  );
};

export default FormFieldSwitch;
