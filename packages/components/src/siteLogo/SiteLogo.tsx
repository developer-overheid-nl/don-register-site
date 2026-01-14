import { Logo } from "@developer-overheid-nl/proprietary";
import type { JSX } from "react";

export default function SiteLogo({
  isRoot,
  href,
}: {
  isRoot: boolean;
  href: string;
}) {
  const element = !isRoot ? "a" : "div";
  const props = {
    className: "site-logo",
    ...(!isRoot ? { href } : {}),
  };

  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element {...props}>
      <Logo forced="light" />
    </Element>
  );
}
