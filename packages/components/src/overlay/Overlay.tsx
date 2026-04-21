import clsx from "clsx";
import styles from "./styles.module.css";

const Overlay = ({
  children,
  active,
}: {
  children?: React.ReactNode;
  active: boolean;
}) => {
  return (
    <div className={clsx(styles.overlay, active && styles.active)}>
      {children}
    </div>
  );
};

export default Overlay;
