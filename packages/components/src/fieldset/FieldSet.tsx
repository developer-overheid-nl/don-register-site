import {
  type FieldsetProps,
  Fieldset as RHCFieldset,
} from "@rijkshuisstijl-community/fieldset-react/no-side-effects";
import clsx from "clsx";
import styles from "./styles.module.css";

const Fieldset = ({ className, ...props }: FieldsetProps) => (
  <RHCFieldset {...props} className={clsx(styles.fieldset, className)} />
);

export default Fieldset;
