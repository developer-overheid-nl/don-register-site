import {
  type LinkProps,
  Link as RHCLink,
} from "@rijkshuisstijl-community/link-react/no-side-effects";

const Link = (props: LinkProps) => {
  return <RHCLink {...props} />;
};

export default Link;
