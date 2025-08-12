import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import SiteLogo from "../siteLogo/SiteLogo"
import { Heading, Link } from '@rijkshuisstijl-community/components-react';
import { Lint } from "../../../../proprietary";
import { IconDeltaNaarLinksInline } from "../../../../proprietary/icons";

interface HeaderProps {
  titleSite: string;
  titlePage: string;
  mainSite: { name: string; url: string };
  urlCurrent?: string;
}

function Header({ titleSite, titlePage, mainSite, urlCurrent }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <nav aria-label={t('components.back-to-homepage-landmark')}><SiteLogo urlCurrent={urlCurrent} /></nav>
      <Lint className={styles.lint} />
      <div className={styles.title}>
        <Heading level={1} appearanceLevel={3} className={styles.heading}>{titleSite}<span className="sr-only">: {titlePage}</span></Heading>
        <nav aria-label={t('components.back-to-main-site-landmark')}>
          <Link href={mainSite.url} className={styles.link}>
            <IconDeltaNaarLinksInline className={styles.icon} /> 
            {t('components.back-to-main-site', { siteName: mainSite.name })}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function TranslatedHeader({ titleSite, titlePage, mainSite, urlCurrent }: HeaderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Header titleSite={titleSite} titlePage={titlePage} mainSite={mainSite} urlCurrent={urlCurrent} />
    </I18nextProvider>
  );
}
