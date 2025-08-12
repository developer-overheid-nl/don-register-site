import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import { fetchAPI } from "../fetch";
import { use, useMemo, type PropsWithChildren } from "react";
import Markdown from 'react-markdown'

import { CardAsLink, DataBadgeButton, Heading, HeadingGroup, Link, Paragraph } from "@rijkshuisstijl-community/components-react";
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
  className?: string;
}

const CardList = (props: PropsWithChildren<CardListProps>) => {
  const { items, className, ...restProps } = props;

  return (
    <div className={className} {...restProps}>
      <HeadingGroup className={styles.heading}>
        <Heading appearanceLevel={3} level={2}>
          TODO:i18n Zoekresultaten
        </Heading>
        <Paragraph role="status">{items.length} TODO:i18n items</Paragraph>
      </HeadingGroup>
      {
        items && items.length > 0 && (
          <ol className={styles.cardsList}>
            {
              items.map((item, index, array) => (
                <li aria-posinset={index + 1} aria-setsize={array.length} key={item.id}>
                  {/* <pre style={{fontSize: 'x-small', whiteSpace: 'pre-wrap'}}>{JSON.stringify(item)}</pre> */}
                  <CardAsLink 
                    heading={
                      <HeadingGroup>
                      <Heading appearanceLevel={4} level={2}>
                        {item.title}
                      </Heading>
                      <Paragraph itemScope={true} itemType="https://schema.org/Organization" itemID={item.organisation.uri} className={[styles.aboveLink, styles.publisher]}><span itemProp="name">{item.organisation.label}</span></Paragraph>
                      </HeadingGroup>
                    } 
                    href={`/details/${item.id}`}
                    linkLabel={`Bekijk details`}
                    description={<div className={`utrecht-html ${styles.aboveLink}`}><Markdown>{item.description}</Markdown></div>}
                  >
                    <div className="utrecht-badge-list" role="list">
                      <DataBadgeButton className={styles.aboveLink} role="listitem">
                        <a className={styles.badgeLink} href={`https://redocly.github.io/redoc/?url=${item.oasUrl}`} target="_blank" rel="noopener">ReDoc</a>
                      </DataBadgeButton>
                      <DataBadgeButton className={styles.aboveLink} role="listitem">
                        <a className={styles.badgeLink} href={`https://editor.swagger.io/?url=${item.oasUrl}`} target="_blank" rel="noopener">Swagger</a>
                      </DataBadgeButton>
                      <DataBadgeButton className={styles.aboveLink} role="listitem">
                        <a className={styles.badgeLink} href={`https://elements-demo.stoplight.io/?spec=${item.oasUrl}`} target="_blank" rel="noopener">Stoplight</a>
                      </DataBadgeButton>
                    </div>
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

export default CardList;

// export default function TranslatedCardList({ url, apiKey }: { url: string, apiKey: string }) {
//   return (
//     <I18nextProvider i18n={i18n}>
//       <CardList url={url} apiKey={apiKey} />
//     </I18nextProvider>
//   );
// }
