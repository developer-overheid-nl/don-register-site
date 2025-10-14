// 'use client';

import { use, type HTMLProps, type PropsWithChildren } from 'react';
import { Heading, LinkList, LinkListLink } from "@rijkshuisstijl-community/components-react";
import DataBadgeLink from '../dataBadgeLink/DataBadgeLink';
import Icon from '../iconsSprite/Icon';
import styles from './styles.module.css';
import clsx from 'clsx';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n';

export interface FiltersProps extends HTMLProps<HTMLDivElement> {
  routing?: Record<string, any>;
  data: any;
  headers: any;
}

const ListLinkIcon = ({ isActive }: { isActive: boolean }) => {
  return <Icon className={clsx([styles.icon, isActive && styles.active])} name={isActive ? "active" : "delta-naar-rechts-inline"} />;
};

// TODO: make more generic for other filter types

const Filters = (props: PropsWithChildren<FiltersProps>) => {
  const { t } = useTranslation();
  const { data, headers, className, routing } = props;
  const organisations = data && !data.message ? data : [];
  const currentOrganisation = organisations && organisations.find(org => org?.uri === routing?.query?.organisation);

  return (
    <div className={clsx([styles.filters, className])}>
      {
        currentOrganisation && (<div className={clsx("utrecht-badge-list", styles.currentFilter)} role="list">
          <Heading level={2} appearanceLevel={3}>{t('components.current-filter')}</Heading>
          <DataBadgeLink role="listitem" 
            aria-pressed={null} 
            helperText={t('components.remove-filter')}
            icon={<Icon name="kruis-inline" />} 
            href={new URL(`../`, routing?.url).toString()}
          >
            {styles.badgeLink}{currentOrganisation?.label}
          </DataBadgeLink>
        </div>)
      }
      <Heading level={2} appearanceLevel={3}>{t('components.filter-by', { type: 'organisatie' })}</Heading>
      <LinkList>
        {
          organisations && organisations.map((organisation) => (
            <LinkListLink
              className={clsx([organisation.uri === routing?.query?.organisation && styles.active])}
              key={organisation.uri}
              href={new URL(`../?organisation=${organisation.uri}`, routing?.url).toString()}
              icon={<ListLinkIcon isActive={organisation.uri === routing?.query?.organisation} />}
            >{organisation.label}</LinkListLink>
          ))
        }
      </LinkList>
      {/* <ExpandableCheckboxGroup legend="ORGS" options={organisations} selectedOptions={[]} onOptionChange={(option) => {console.log('Option changed', option)}} /> */}
    </div>
  );
}

const TranslatedFilters = (props: PropsWithChildren<FiltersProps>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Filters {...props} />
    </I18nextProvider>
  );
}


export default TranslatedFilters;