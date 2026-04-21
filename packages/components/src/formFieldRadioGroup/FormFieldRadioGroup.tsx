import {
  type FormFieldRadioGroupProps,
  FormFieldRadioGroup as RHCFormFieldRadioGroup,
} from "@rijkshuisstijl-community/components-react";
import styles from "./styles.module.css";

const FormFieldRadioGroup = (props: FormFieldRadioGroupProps) => {
  return (
    <RHCFormFieldRadioGroup className={styles.formFieldRadioGroup} {...props} />
  );
};

export default FormFieldRadioGroup;
