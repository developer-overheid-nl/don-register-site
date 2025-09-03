import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import { fetchAPI } from "../fetch";
import { use, useMemo, type PropsWithChildren } from "react";
import Markdown from 'react-markdown'

import { Alert, CardAsLink, DataBadgeButton, Heading, HeadingGroup as RHCHeadingGroup, Link, Paragraph } from "@rijkshuisstijl-community/components-react";
import IconBadge from "../iconBadge/IconBadge";
import getAppearance, { getDate } from "../iconBadge/getAppearance";
import HeadingGroup from "../headingGroup/HeadingGroup";
//import { useFetch } from "../fetchHook";

// interface CardListProps {
//   items: Array<{ id: string; name: string }>;
// }

// function CardList({ items = [] }: CardListProps) {
//   const { t } = useTranslation();

//   return (
//     items.length > 0 ? (
//       <ul className={`rhc-card-list ${styles.container}`}>
//         {items.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     ) : (
//       <p>{t('components.no-items-found', { items: 'API’s' })}</p>
//     )
//   );
// }

// function CardList({ url, apiKey }: { url: string, apiKey: string }) {
//   const data = use(fetchAPI(url, apiKey));
//   // const { t } = useTranslation();

//   const apis = (data && 'apis' in data) ? (data as Record<string, any>).apis : []; // Assuming the API returns an object with a key 'apis' containing the list of items
//   const message = (data && 'message' in data) ? (data as { message: string }).message : undefined;

//   console.log('CardList URL:', url, 'Key:', apiKey);
//   console.log('CardList data:', apis, 'message:', message);

//   function t(arg0: string, arg1: { items: string; }): import("react").ReactNode | Iterable<import("react").ReactNode> {
//     // throw new Error("Function not implemented.");
//     return `${arg0} ${arg1.items}`; // Placeholder for translation function
//   }

//   return (
//     apis && apis.length > 0 ? (
//       <ul className={`rhc-card-list ${styles.container}`}>
//         {apis.map((item: any) => (
//           <li key={item.id}>{item.title}</li>
//         ))}
//       </ul>
//     ) : (
//       <p>{t('components.no-items-found', { items: 'API’s' })}</p>
//     )
//   );
// }

export interface CardListProps {
  items: Array<any>;
  total?: number;
  routing?: Record<string, any>;
  i18n?: Record<string, string | Record<string, string>>;
  className?: string;
}

const CardsList = (props: PropsWithChildren<CardListProps>) => {
  const { t } = useTranslation();
  const { items, total = 0, routing, i18n: i18nApp, className, ...restProps } = props;
  const i18nContext = routing?.query && Object.keys(routing.query).length > 0 ? 'filtered' : 'all';

  // TODO: higher up in the layout / page or context-component
  i18n.addResourceBundle(i18n.language, 'translation', i18nApp ? i18nApp[i18n.language] : {}, true, true)

  return (
    <div className={className} {...restProps}>
      <RHCHeadingGroup className={styles.heading}>
        <Heading appearanceLevel={3} level={2}>
          {t('components.search-results', {context: i18nContext})}
        </Heading>
        <Paragraph role="status">{t('components.search-results-amount', {context: i18nContext, amount: total})}</Paragraph>
      </RHCHeadingGroup>
      {
        items && items.length == 0 && (
          <Alert type="info">{t('components.search-results-amount-no-items', {context: i18nContext})}</Alert>
        )
      }
      {
        items && items.length > 0 && (
          <ol className={styles.cardsList}>
            {
              items.map((item, index, array) => (
                <li aria-posinset={index + 1} aria-setsize={array.length} key={item.id}>
                  {/* <pre style={{fontSize: 'x-small', whiteSpace: 'pre-wrap'}}>{JSON.stringify(item.lifecycle)}</pre> */}
                  <CardAsLink 
                    heading={
                      <HeadingGroup 
                        title={item.title} 
                        subTitle={
                          <Paragraph itemScope={true} itemType="https://schema.org/Organization" itemID={item.organisation.uri} className={[styles.aboveLink, styles.publisher]}>
                            <span itemProp="name"><Link className={styles.orgLink} href={new URL(`../?organisation=${item.organisation.uri}`, routing?.url).toString()}>
                              {item.organisation.label}
                            </Link></span>
                          </Paragraph>
                        }
                        level={2} 
                        appearanceLevel={4} 
                      />
                      // <HeadingGroup>
                      //   <Heading appearanceLevel={4} level={2}>
                      //     {item.title}
                      //   </Heading>
                      //   <Paragraph itemScope={true} itemType="https://schema.org/Organization" itemID={item.organisation.uri} className={[styles.aboveLink, styles.publisher]}>
                      //     <span itemProp="name"><Link className={styles.orgLink} href={new URL(`../?organisation=${item.organisation.uri}`, routing?.url).toString()}>
                      //       {item.organisation.label}
                      //     </Link></span>
                      //   </Paragraph>
                      // </HeadingGroup>
                    } 
                    href={new URL(`../${item.id}`, routing?.url).toString()}
                    linkLabel={t('components.view-details')}
                    description={<div className={`utrecht-html ${styles.aboveLink}`}><Markdown>{item.description}</Markdown></div>}
                    metadata={<>
                      <div className="utrecht-badge-list" role="list">
                        {/* @ts-expect-error: RHC DataBadgeButton needs update with className prop  */}
                        <DataBadgeButton className={styles.aboveLink} role="listitem" aria-pressed={null}>
                          <a className={styles.badgeLink} href={`https://redocly.github.io/redoc/?url=${item.oasUrl}`} target="_blank" rel="noopener">ReDoc</a>
                        </DataBadgeButton>
                        {/* @ts-expect-error: RHC DataBadgeButton needs update with className prop  */}
                        <DataBadgeButton className={styles.aboveLink} role="listitem" aria-pressed={null}>
                          <a className={styles.badgeLink} href={`https://editor.swagger.io/?url=${item.oasUrl}`} target="_blank" rel="noopener">Swagger</a>
                        </DataBadgeButton>
                        {/* @ts-expect-error: RHC DataBadgeButton needs update with className prop  */}
                        <DataBadgeButton className={styles.aboveLink} role="listitem" aria-pressed={null}>
                          <a className={styles.badgeLink} href={`https://elements-demo.stoplight.io/?spec=${item.oasUrl}`} target="_blank" rel="noopener">Stoplight</a>
                        </DataBadgeButton>
                      </div>
                      <div className={styles.metadata}>
                        <IconBadge 
                          className={styles.aboveLink} 
                          name={item.lifecycle.status} 
                          appearance={getAppearance(item.lifecycle)} 
                          title={t(`components.status-${item.lifecycle.status}`, {context: getAppearance(item.lifecycle), date: getDate(item.lifecycle)})} 
                          /> 
                        {t('components.version', {version: item.lifecycle.version})}
                      </div>
                    </>}
                  >
                  </CardAsLink>
                </li>
              ))
            }
          </ol>
        )
      }
    </div>
  )
}

const TranslatedCardsList = (props: PropsWithChildren<CardListProps>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <CardsList {...props} />
    </I18nextProvider>
  );
}

export default TranslatedCardsList;
