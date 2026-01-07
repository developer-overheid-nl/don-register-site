import {
  Heading,
  type HeadingProps,
  Paragraph,
  HeadingGroup as RHCHeadingGroup,
  type HeadingGroupProps as RHCHeadingGroupProps,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import type { HTMLProps, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.css";

export interface HeadingGroupProps extends RHCHeadingGroupProps {
  title: string;
  subTitle?: string | ReactNode;
  level: HeadingProps["level"];
  appearanceLevel?: HeadingProps["appearanceLevel"];
  subTitleProps?: HTMLProps<Paragraph>;
}

const HeadingGroup = (props: PropsWithChildren<HeadingGroupProps>) => {
  const {
    title,
    subTitle,
    level,
    appearanceLevel,
    className,
    subTitleProps,
    children,
    ...restProps
  } = props;
  return (
    <RHCHeadingGroup
      className={clsx(className, styles.headingGroup)}
      {...restProps}
    >
      <Heading appearanceLevel={appearanceLevel} level={level}>
        {title}
      </Heading>
      {typeof subTitle === "string" ? (
        <Paragraph {...subTitleProps}>{subTitle}</Paragraph>
      ) : (
        subTitle || children
      )}
    </RHCHeadingGroup>
  );
};

export default HeadingGroup;
