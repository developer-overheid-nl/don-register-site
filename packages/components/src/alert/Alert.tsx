import { Alert as RHCAlert, type AlertProps as RHCAlertProps } from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";
import type { PropsWithChildren } from "react";

export interface AlertProps extends RHCAlertProps {
  className?: string;
}

const Alert = (props: PropsWithChildren<AlertProps>) => {
  const { className } = props;

  return <RHCAlert className={clsx(className, styles.alert)} {...props} />;
};

export default Alert;
