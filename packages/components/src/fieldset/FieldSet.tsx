import {
  type FieldsetProps,
  Fieldset as RHCFieldset,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

const Fieldset = ({ className, ...props }: FieldsetProps) => (
  <RHCFieldset {...props} className={clsx(styles.fieldset, className)} />
);

export default Fieldset;
