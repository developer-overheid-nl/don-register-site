import { type FragmentProps, type PropsWithChildren, use } from "react";
import { fetchAPI } from "../fetch";
// import { useStore } from '@nanostores/react';
import { dataStore } from '../store';
import CardsList from "../cardsList/CardsList";
import styles from './styles.module.css';

export interface OverviewContainerProps {
  apiItemsKey: string;
}

export default function OverviewContainer({apiItemsKey, children}: PropsWithChildren<OverviewContainerProps>) {
  const data = use(fetchAPI(`https://gist.githubusercontent.com/dvh/ceba3e787ddb80e53c345afdb0c74b44/raw`));
  //const $data = useStore(dataStore);
  let items;

  if (typeof data === "object" && data !== null && !("message" in data)) {
    // console.log(data[apiItemsKey]?.length, data.message);
    dataStore.set(data);
    items = data[apiItemsKey];
  } else {
    console.error("Data is not a valid record:", data);
  }

  return (
    <div className={styles.layout}>
      <div className={styles.intro}>{`<!--extra content: -->`}{children}</div>
      <div className={styles.search}>{`<!--search-->`}</div>
      <div className={styles.filters}>{`<!--filters-->`}</div>
      <CardsList className={styles.list} items={items} />
      <div className={styles.pagination}>{`<!--pagination-->`}</div>
    </div>
  )
}