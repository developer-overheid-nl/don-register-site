import type { ReactNode } from "react";
import styles from "./styles.module.css";

export interface AmountLabelProps {
  label: ReactNode;
  amount: string | number;
}

const AmountLabel = ({ label, amount }: AmountLabelProps) => (
  <div className={styles.amountLabel}>
    <span className={styles.labelText}>{label}</span>&nbsp;
    <span className={styles.amountText}>({amount})</span>
  </div>
);

export default AmountLabel;
