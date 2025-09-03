'use client';

import { useStore } from '@nanostores/react';
import { fetchHook } from '../fetch';
import { use, type HTMLProps, type PropsWithChildren } from 'react';
import { DataBadgeButton, ExpandableCheckboxGroup, Heading, LinkList, LinkListCard, LinkListLink } from "@rijkshuisstijl-community/components-react";
import Icon from '../iconsSprite/Icon';
import styles from './styles.module.css';
import clsx from 'clsx';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n';
// import { dataStore } from '../store';

export interface FiltersProps extends HTMLProps<HTMLDivElement> {
  routing?: Record<string, any>;
}

const ListLinkIcon = ({ isActive }: { isActive: boolean }) => {
  return <Icon className={clsx([styles.icon, isActive && styles.active])} name={isActive ? "active" : "delta-naar-rechts-inline"} />;
};

// const filterOrg

const Filters = (props: PropsWithChildren<FiltersProps>) => {
  const { t } = useTranslation();
  const { data, headers } = use(fetchHook(`https://api.don.apps.digilab.network/api-register/v1/organisations`, '153ede87-7c4c-4f22-99b2-d718423dd18d'));
  const { className, routing } = props;
  // const $data = useStore(dataStore);
  const organisations = data;
  const currentOrganisation = organisations.find(org => org.uri === routing?.query?.organisation);

  console.log(currentOrganisation,'routing:', routing);

  return (
    <div className={clsx([styles.filters, className])}>
      {/* <pre style={{fontSize: 'x-small', whiteSpace: 'pre-wrap'}}>{JSON.stringify(organisations)}</pre> */}
      {
        currentOrganisation && (<div className="utrecht-badge-list" role="list">
          <Heading level={2} appearanceLevel={3}>{t('components.current-filter')}</Heading>
          {/* @ts-expect-error: RHC DataBadgeButton needs update with role prop  */}
          <DataBadgeButton role="listitem" 
            aria-pressed={null} 
            helperText={t('components.remove-filter')}
            icon={<Icon name="kruis-inline" />}
          >
            <a className={styles.badgeLink} href={new URL(`../`, routing?.url).toString()}>{currentOrganisation?.label}</a>
          </DataBadgeButton>
        </div>)
      }
      <Heading level={2} appearanceLevel={3}>{t('components.filter-by-organisation')}</Heading>
      <LinkList>
        {
          organisations.map((organisation) => (
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