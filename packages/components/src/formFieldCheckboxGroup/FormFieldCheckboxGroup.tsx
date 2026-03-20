import {
  type FormFieldCheckboxGroupProps,
  FormFieldCheckboxGroup as RHCFormFieldCheckboxGroup,
} from "@rijkshuisstijl-community/components-react";
import styles from "./styles.module.css";

const FormFieldCheckboxGroup = (props: FormFieldCheckboxGroupProps) => {
  return (
    <RHCFormFieldCheckboxGroup
      className={styles.formFieldCheckboxGroup}
      {...props}
    />
  );
};

export default FormFieldCheckboxGroup;
