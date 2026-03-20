import {
  type HeadingProps,
  Heading as RHCHeading,
} from "@rijkshuisstijl-community/components-react";

export type { HeadingProps } from "@rijkshuisstijl-community/components-react";

export const clampHeadingLevel = (headingLevel: number) =>
  Math.max(1, Math.min(headingLevel + 1, 5)) as HeadingProps["level"];

const Heading = (props: HeadingProps) => {
  return <RHCHeading {...props} />;
};

export default Heading;
