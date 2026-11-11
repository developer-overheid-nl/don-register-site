import {
  type HeadingProps,
  Heading as RHCHeading,
} from "@rijkshuisstijl-community/heading-react/no-side-effects";

export type { HeadingProps } from "@rijkshuisstijl-community/heading-react/no-side-effects";

export const clampHeadingLevel = (headingLevel: number) =>
  Math.max(1, Math.min(headingLevel, 5)) as HeadingProps["level"];

const Heading = (props: HeadingProps) => {
  return <RHCHeading {...props} />;
};

export default Heading;
