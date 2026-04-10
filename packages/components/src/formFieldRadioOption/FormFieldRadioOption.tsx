import {
  type CustomFormFieldProps,
  FormField,
  Radio as RHCRadio,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import { Fragment, useId } from "react";
import AmountLabel, { type AmountLabelProps } from "../amountLabel/AmountLabel";
import styles from "./styles.module.css";

export interface FormFieldRadioOptionProps
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormFieldRadioOption = (props: FormFieldRadioOptionProps) => {
  const genId = useId();
  const {
    id = genId,
    statusId = genId,
    errorMessageId = genId,
    descriptionId = genId,
    name,
    value,
    defaultChecked,
    checked,
    amount,
    label,
    className,
    children,
    onChange,
    ...restProps
  } = props;

  return (
    <FormField
      type="radio" // although not exposed by RHC
      className={clsx("utrecht-form-field--radio", styles.radio, className)}
      statusId={statusId}
      errorMessageId={errorMessageId}
      descriptionId={descriptionId}
      label={
        <Fragment>
          <RHCRadio
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            className="utrecht-checkbox--custom utrecht-form-field__input"
            onChange={onChange}
          />
          <AmountLabel label={label} amount={amount} />
        </Fragment>
      }
      input={null}
      {...restProps}
    >
      <span className={styles.info}>{children}</span>
    </FormField>
  );
};

export default FormFieldRadioOption;
