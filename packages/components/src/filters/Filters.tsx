// 'use client';
/* biome-ignore-all lint: TODO: filters needs a refactor anyway */

import {
  Heading,
  LinkList,
  LinkListLink,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import type { HTMLProps, PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Alert from "../alert/Alert";
import DataBadgeLink from "../dataBadgeLink/DataBadgeLink";
import i18n from "../i18n";
import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

export interface FiltersProps extends HTMLProps<HTMLDivElement> {
  routing?: Record<string, any>;
  data: any;
  headers: any;
  error: any;
  status?: number;
  statusText?: string;
}

const ListLinkIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <Icon
      className={clsx([styles.icon, isActive && styles.active])}
      name={isActive ? "active" : "delta-naar-rechts-inline"}
    />
  );
};

// TODO: make more generic for other filter types

const Filters = (props: PropsWithChildren<FiltersProps>) => {
  const { t } = useTranslation();
  const { data, headers, error, status, statusText, className, routing } =
    props;
  const organisations = data && !data.message ? data : [];
  const currentOrganisation =
    organisations &&
    organisations.find((org: any) => org?.uri === routing?.query?.organisation);

  return (
    <div className={clsx([styles.filters, className])}>
      {currentOrganisation && (
        <div
          className={clsx("utrecht-badge-list", styles.currentFilter)}
          role="list"
        >
          <Heading level={2} appearanceLevel={3}>
            {t("components.current-filter")}
          </Heading>
          <DataBadgeLink
            role="listitem"
            aria-pressed={null}
            helperText={t("components.remove-filter")}
            icon={<Icon name="kruis-inline" />}
            href={new URL(`../`, routing?.url).toString()}
          >
            {styles.badgeLink}
            {currentOrganisation?.label}
          </DataBadgeLink>
        </div>
      )}
      <Heading level={2} appearanceLevel={3}>
        {t("components.filter-by", { type: "organisatie" })}
      </Heading>
      <LinkList>
        {organisations &&
          organisations.map((organisation: any) => (
            <LinkListLink
              className={clsx([
                organisation.uri === routing?.query?.organisation &&
                  styles.active,
              ])}
              key={organisation.uri}
              href={new URL(
                `../?organisation=${organisation.uri}`,
                routing?.url,
              ).toString()}
              icon={
                <ListLinkIcon
                  isActive={organisation.uri === routing?.query?.organisation}
                />
              }
            >
              {organisation.label}
            </LinkListLink>
          ))}
      </LinkList>

      {error && (
        <Alert type="error">
          {(error as unknown as any).message ||
            (error as unknown as any).error_msg ||
            `${status}: ${statusText}` ||
            t("components.fuzz-error")}
        </Alert>
      )}
    </div>
  );
};

const TranslatedFilters = (props: PropsWithChildren<FiltersProps>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Filters {...props} />
    </I18nextProvider>
  );
};

export default TranslatedFilters;
