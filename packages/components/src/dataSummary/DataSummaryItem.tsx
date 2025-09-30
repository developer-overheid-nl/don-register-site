import { DataSummaryItem as RHCDataSummaryItem, type DataSummaryItemProps as RHCDataSummaryItemProps } from "@rijkshuisstijl-community/components-react";

export interface DataSummaryItemProps extends Partial<RHCDataSummaryItemProps> {};

const DataSummaryItem = (props: DataSummaryItemProps) => {
  const { className, itemKey = '', itemValue = '-', ...restProps } = props;
  return <RHCDataSummaryItem itemKey={itemKey} itemValue={itemValue} className={className} {...restProps} />;
}

export default DataSummaryItem;
