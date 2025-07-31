import styles from "./styles.module.css";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n'; 

interface CardListProps {
  items: Array<{ id: string; name: string }>;
}

function CardList({ items = [] }: CardListProps) {
  const { t } = useTranslation();

  return (
    items.length > 0 ? (
      <ul className={`rhc-card-list ${styles.container}`}>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    ) : (
      <p>{t('components.no-items-found', { items: 'API’s' })}</p>
    )
  );
}

export default function TranslatedCardList({ items }: CardListProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <CardList items={items} />
    </I18nextProvider>
  );
}
