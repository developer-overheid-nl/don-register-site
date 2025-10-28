import {
  DataSummary as RHCDataSummary,
  type DataSummaryProps as RHCDataSummaryProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface DataSummaryProps extends RHCDataSummaryProps {
  contained?: boolean;
}

const DataSummary = (props: DataSummaryProps) => {
  const { className, contained = false, ...restProps } = props;
  return (
    <RHCDataSummary
      className={clsx(className, { [styles.isContained]: contained })}
      {...restProps}
    />
  );
};

export default DataSummary;
