import type { HTMLProps, PropsWithChildren, ReactNode } from "react";
import { HeadingGroup as RHCHeadingGroup, Heading, type HeadingProps, Paragraph } from "@rijkshuisstijl-community/components-react";

export interface HeadingGroupProps extends HTMLProps<RHCHeadingGroup> {
  title: string;
  subTitle?: string | ReactNode;
  level: HeadingProps["level"];
  appearanceLevel?: HeadingProps["appearanceLevel"];
  subTitleProps?: HTMLProps<Paragraph>;
}

const HeadingGroup = (props: PropsWithChildren<HeadingGroupProps>) => {
  const { title, subTitle, level, appearanceLevel, className, subTitleProps, children, ...restProps } = props;
  return (
    <RHCHeadingGroup className={className} {...restProps}>
      <Heading appearanceLevel={appearanceLevel} level={level}>
        {title}
      </Heading>
      {typeof subTitle === "string" ? (
        <Paragraph {...subTitleProps}>{subTitle}</Paragraph>
      ) : (
        subTitle || children
      )}
    </RHCHeadingGroup>
  )
}

export default HeadingGroup;
