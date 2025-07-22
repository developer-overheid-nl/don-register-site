import Logo from '../../../../proprietary/logos/don/react/Logo';

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
      <span className="sr-only">Register DON</span>
    </Element>
  );
}
