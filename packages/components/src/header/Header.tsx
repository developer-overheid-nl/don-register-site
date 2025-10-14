import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import SiteLogo from "../siteLogo/SiteLogo"
import { Heading, Link } from '@rijkshuisstijl-community/components-react';
import { Lint } from "../../../../proprietary";
// import { IconDeltaNaarLinksInline } from "../../../../proprietary/icons";

export interface HeaderProps extends LogoNavProps {
  titleSite: string;
  titlePage: string;
}

interface LogoNavProps {
  mainSite: { name: string; url: string };
  urlCurrent?: string;
  /**
   * routePattern(s) that are considered hompages, e.g. `/`, `/apis`, `/apis/[...pages]`
   * The first item in the array will be used for the homepage link.
   *
   * @type string[]
   */
  urlHomepage?: string[];
  /**
   * How the link around the logo should behave.
   * - `no-link`: always no link around the logo
   * - `site-home`: (default) a link around the logo that links back to this site, no link on hompeage
   * - `main-site`: a link around the logo that links always back to the main site
   * - `main-site-on-home`: a link around the logo that links back to this site's homepage, but on the homepage links back to the main site
   *
   * Note: translation keys: `components.back-to-homepage-landmark`, ...
   */
  logoLinkBehaviour?: 'no-link' | 'site-home' | 'main-site' | 'main-site-on-home';
}

function LogoNav(props: LogoNavProps) {
  const { t } = useTranslation();
  const { mainSite, urlCurrent = '/', urlHomepage = ['/'], logoLinkBehaviour } = props;
  let isRoot: boolean = urlHomepage.includes(urlCurrent);
  let href: string = '/';
  let landmark: string | undefined;
  let title: string | undefined;

  switch (logoLinkBehaviour) {
    case 'no-link':
      isRoot = true;
      break;
    case 'main-site':
      isRoot = false;
      href = mainSite.url;
      landmark = t('components.back-to-main-site-landmark', { siteName: mainSite.name });
      break;
    case 'main-site-on-home':
      href = isRoot ? mainSite.url : urlHomepage[0] || '/';
      landmark = isRoot ? t('components.back-to-main-site-landmark', { siteName: mainSite.name }) : t('components.back-to-homepage-landmark');
      title = isRoot ? t('components.back-to-main-site', { siteName: mainSite.name }) : t('components.back-to-homepage');
      isRoot = false;
      break;
    default:
      href = urlHomepage[0] || '/';
      landmark = isRoot ? undefined : t('components.back-to-homepage-landmark');
      break;
  }

  return (
    landmark ? (
      <nav aria-label={landmark} title={title}><SiteLogo isRoot={isRoot} href={href} /></nav>
    ) : (
      <div className="nav"><SiteLogo isRoot={isRoot} href={href} /></div>
    )
  );
}

function Header({ titleSite, titlePage, mainSite, urlCurrent, urlHomepage, logoLinkBehaviour }: HeaderProps) {
  // const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <LogoNav mainSite={mainSite} urlCurrent={urlCurrent} urlHomepage={urlHomepage} logoLinkBehaviour={logoLinkBehaviour} />
      <Lint className={styles.lint} />
      <div className={styles.title}>
        <Heading level={1} appearanceLevel={3} className={styles.heading}>{titleSite}<span className="sr-only">: {titlePage}</span></Heading>
        {/* TODO: uncomment and update component if backlink here is still needed... */}
        {/* <nav aria-label={t('components.back-to-main-site-landmark')}>
          <Link href={mainSite.url} className={styles.link}>
            <IconDeltaNaarLinksInline className={styles.icon} /> 
            {t('components.back-to-main-site', { siteName: mainSite.name })}
          </Link>
        </nav> */}
      </div>
    </header>
  );
}

export default function TranslatedHeader(props: HeaderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header {...props} />
    </I18nextProvider>
  );
}
