import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import { fetchAPI } from "../fetch";
import { use, useMemo } from "react";
//import { useFetch } from "../fetchHook";

interface CardListProps {
  items: Array<{ id: string; name: string }>;
}

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

function CardList({ url, apiKey }: { url: string, apiKey: string }) {
  const data = use(fetchAPI(url, apiKey));
  // const { t } = useTranslation();

  const apis = (data && 'apis' in data) ? (data as Record<string, any>).apis : []; // Assuming the API returns an object with a key 'apis' containing the list of items
  const message = (data && 'message' in data) ? (data as { message: string }).message : undefined;

  console.log('CardList URL:', url, 'Key:', apiKey);
  console.log('CardList data:', apis, 'message:', message);

  function t(arg0: string, arg1: { items: string; }): import("react").ReactNode | Iterable<import("react").ReactNode> {
    // throw new Error("Function not implemented.");
    return `${arg0} ${arg1.items}`; // Placeholder for translation function
  }

  return (
    apis && apis.length > 0 ? (
      <ul className={`rhc-card-list ${styles.container}`}>
        {apis.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    ) : (
      <p>{t('components.no-items-found', { items: 'API’s' })}</p>
    )
  );
}

export default function TranslatedCardList({ url, apiKey }: { url: string, apiKey: string }) {
  return (
    <I18nextProvider i18n={i18n}>
      <CardList url={url} apiKey={apiKey} />
    </I18nextProvider>
  );
}
