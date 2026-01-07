import {
  FormFieldTextInput,
  PrimaryActionButton,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Heading from "../heading/Heading";
import i18n from "../i18n";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

export interface SearchProps {
  searchUrl: string;
  searchKey?: string;
  searchTerm?: string;
  className?: string;
}

const Search = (props: SearchProps) => {
  const { t } = useTranslation();
  const { searchUrl, searchKey = "q", searchTerm, className } = props;

  return (
    <search
      aria-labelledby="search-heading"
      className={clsx(styles.search, className)}
    >
      <Heading id="search-heading" level={2} appearanceLevel={3}>
        {t("components.search")}
      </Heading>
      <form action={searchUrl} method="GET" className={styles.form}>
        <FormFieldTextInput
          className={styles.input}
          aria-describedby="search-help"
          label={t("components.search-label")}
          name={searchKey}
          type="text"
          value={searchTerm}
        >
          <div className="sr-only" id="search-help">
            {t("components.search-help")}
          </div>
        </FormFieldTextInput>

        <PrimaryActionButton
          aria-label={t("components.search-button")}
          className={styles.button}
          type="submit"
        >
          <Icon name="zoek-inline" width="1.5rem" height="1.5rem" />
        </PrimaryActionButton>
      </form>
    </search>
  );
};

const TranslatedSearch = (props: PropsWithChildren<SearchProps>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Search {...props} />
    </I18nextProvider>
  );
};

export default TranslatedSearch;
