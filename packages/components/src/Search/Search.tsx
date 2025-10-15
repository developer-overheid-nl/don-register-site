import { I18nextProvider, useTranslation } from "react-i18next";
import Heading from "../heading/Heading";
import { FormFieldTextInput, PrimaryActionButton } from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Icon from "../iconsSprite/Icon";
import i18n from "../i18n";
import type { PropsWithChildren } from "react";

export interface SearchProps {
  searchTerm?: string;
  className?: string;
}

const Search = (props: SearchProps) => {
  const { t } = useTranslation();
  const { searchTerm, className } = props;

  return (
    <search aria-labelledby="search-heading" role="search" className={clsx(styles.search, className)}>
      <Heading id="search-heading" level={2} appearanceLevel={3}>{t('components.search')}</Heading>
      <form action={`zoeken`} method="GET" className={styles.form}>
        {/* @ts-expect-error className not exposed */}
        <FormFieldTextInput className={styles.input}
          aria-describedby="search-help"
          label={t('components.search-label')}
          name="q"
          type="text"
          value={searchTerm}
        ><div className="sr-only" id="search-help">
          {t('components.search-help')}
        </div></FormFieldTextInput>
        
        <PrimaryActionButton aria-label={t('components.search-button')} className={styles.button} type="submit">
          <Icon name="zoek-inline" width="1.5rem" height="1.5rem" />
        </PrimaryActionButton>
      </form>
    </search>
  )
}

const TranslatedSearch = (props: PropsWithChildren<SearchProps>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Search {...props} />
    </I18nextProvider>
  );
}


export default TranslatedSearch;