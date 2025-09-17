import { DataSummaryItem as RHCDataSummaryItem, type DataSummaryItemProps as RHCDataSummaryItemProps } from "@rijkshuisstijl-community/components-react";

export interface DataSummaryItemProps extends RHCDataSummaryItemProps {}

const DataSummaryItem = (props: DataSummaryItemProps) => {
  const { className, ...restProps } = props;
  return <RHCDataSummaryItem className={className} {...restProps} />;
}

export default DataSummaryItem;
