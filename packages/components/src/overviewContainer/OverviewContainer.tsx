import { type FragmentProps, type PropsWithChildren, use } from "react";
import { fetchHook, type paginationHeaders } from "../fetch";
import { useStore } from '@nanostores/react';
import { dataStore, configStore } from '../store';
import CardsList from "../cardsList/CardsList";
import styles from './styles.module.css';
import { Alert, ButtonLink, Paragraph, type ButtonLinkProps } from "@rijkshuisstijl-community/components-react";
import Pagination, { type PaginationProps } from "../pagination/Pagination";
import IconBadge from "../iconBadge/IconBadge";
import { Filters } from "..";

export interface OverviewContainerProps {
  apiItemsKey: string;
  page: string | number;
  routing: Record<string, any>;
}

// interface headerPaginationProps {
//   next?: parseLinkHeader.Link;
//   prev?: parseLinkHeader.Link;
//   currentPage: number;
//   perPage: number;
//   totalPages: number;
//   totalCount: number;
// }

// const getUrlParts = (url: string | undefined): {page: number, perPage: number} | null | undefined => {
//   const regex = /page=(\d+).*?perPage=(\d+)/;
//   const matches = url?.match(regex);

//   return matches && {page: Number(matches[1]), perPage: Number(matches[2])};
// }

const getPagination = (pagination: paginationHeaders | null | undefined, url: URL): PaginationProps => {
  // const {self, next, prev} = links;

  // const selfParts = getUrlParts(self.href);
  // const nextParts = getUrlParts(next?.href);
  // const prevParts = getUrlParts(prev?.href);

  // const resultsBegin = selfParts && selfParts?.page - 1 * selfParts?.perPage;
  // const resultsEnd = selfParts && selfParts?.page * selfParts?.perPage;
  // const range = 
  // console.log({self, next, prev}, {selfParts, nextParts, prevParts}, {resultsBegin, resultsEnd});

  if (!pagination) {
    return {
      links: []
    }
  }

  // console.log(pagination)

  // TODO: make them self from links header
  const prev = pagination.prev !== undefined && new URL(`./${pagination.prev.page}${decodeURIComponent(url.search)}`, url).toString();
  const next = pagination.next !== undefined && new URL(`./${pagination.next.page}${decodeURIComponent(url.search)}`, url).toString();

  const rangeBegin = (pagination.currentPage -1) * pagination.perPage + 1;
  const rangeEnd = pagination.currentPage * pagination.perPage;

  return {
    links: [{
      href: new URL(`./${pagination.currentPage}${decodeURIComponent(url.search)}`, url).toString(), 
      label: pagination.currentPage || 0, 
      range: [rangeBegin, rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd],
    }], 
    current: 0, 
    prev, 
    next
  }
}

export default function OverviewContainer({apiItemsKey, page, routing, children}: PropsWithChildren<OverviewContainerProps>) {
  const apiFilters = {
    page,
    ...routing.query
  }
  //const data = use(fetchAPI(`https://gist.githubusercontent.com/dvh/ceba3e787ddb80e53c345afdb0c74b44/raw`));
  // const { data, headers } = use(fetchAPI(`http://localhost:1337/v1/apis?page=${page}`));
  const { data, headers } = use(fetchHook(`https://api.don.apps.digilab.network/api-register/v1/apis?${new URLSearchParams(apiFilters).toString()}&perPage=4`, '153ede87-7c4c-4f22-99b2-d718423dd18d'));
  // @ts-expect-error TODO: correct type, move to other place, see CardsList
  const { i18n } = useStore(configStore);
  let items: Array<any> = [], pagination = null;

  if (data && typeof data === 'object' && Array.isArray(data)) {
    console.log(data.length, headers);
    dataStore.set(data);
    items = data;
    pagination = headers.pagination;
  } else if (data && typeof data === 'object' && 'message' in data) {
    console.error("API error:", data.message);
  } else {
    console.error("Data is not a valid record:", data);
  }

  const paginationProps = getPagination(pagination, routing.url);
  // console.log({pagination, paginationProps})

  return (
    <div className={styles.layout}>
      <div className={styles.intro}><Paragraph>{children}</Paragraph></div>
      {/* <div className={styles.search}>{`<!--search-->`}</div> */}
      <Filters className={styles.filters} routing={routing} />
      <CardsList className={styles.list} items={items} total={pagination?.totalCount} routing={routing} i18n={i18n} />
      <div className={styles.pagination}>
        {pagination && pagination?.currentPage <= pagination?.totalPages ? (
          <Pagination {...paginationProps} />
        ) : (
          <>
            <Alert type="warning">These aren't the droids you're looking for</Alert>
            <Pagination links={[]} prev={`${routing.path.parentPath}/1`} />
          </>
        )}
      </div>
    </div>
  )
}
