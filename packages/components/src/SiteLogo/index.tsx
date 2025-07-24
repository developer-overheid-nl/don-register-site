import type { JSX } from 'react';
import { Logo } from '../../../../proprietary';

export default function SiteLogo({ urlHomepage = '/', urlCurrent }: { urlHomepage?: string, urlCurrent?: string }) {
  const isRoot = urlHomepage !== urlCurrent;
  const element = isRoot ? 'a' : 'div';
  const props = {
    className: 'site-logo',
    ...(isRoot ? { href: urlHomepage, rel: 'home' } : {}),
  };

  const Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element {...props}>
      <Logo />
    </Element>
  );
}
