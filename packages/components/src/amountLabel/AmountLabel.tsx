import type { ReactNode } from "react";
import styles from "./styles.module.css";

export interface AmountLabelProps {
  /** The text or content of the label. */
  label: ReactNode;
  /** Optional amount, shown between brackets: `(` and `)`. */
  amount?: string | number;
}

/**
 * Shows a label with optional a amount between brackets
 */
const AmountLabel = ({
  id,
  label,
  amount,
}: AmountLabelProps & {
  /** Optional id, e.g. to reference the label with `aria-labelledby`. */
  id?: string;
}) => (
  <div id={id} className={styles.amountLabel}>
    <span className={styles.labelText}>{label}</span>&nbsp;
    {amount ? <span className={styles.amountText}>({amount})</span> : null}
  </div>
);

export default AmountLabel;
