import clsx from "clsx";
import type { ElementType, HTMLAttributes, PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n";
// import parseLinkHeader from "parse-link-header";
import styles from "./styles.module.css";

interface PageLinkProps
  extends Omit<
    HTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>,
    "onAbort"
  > {
  href: string;
  label: number | string;
  range?: [number, number];
  index: number;
  current: number;
}

interface RelativeLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  position: "prev" | "next";
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  links: Array<{
    href: PageLinkProps["href"];
    label: PageLinkProps["label"];
    /** Range of shown items on this page; [begin, end] */
    range?: PageLinkProps["range"];
  }>;
  current?: PageLinkProps["current"];
  prev?: string | false;
  next?: string | false;
  className?: string;
}

// export interface paginationHeaders {
//   currentPage: number;
//   perPage: number;
//   totalCount: number;
//   totalPages: number;
//   self: parseLinkHeader.Link;
//   prev?: parseLinkHeader.Link;
//   next?: parseLinkHeader.Link;
// }

// const getPagination = (pagination: paginationHeaders | null | undefined, url: URL): PaginationProps => {
//   // const {self, next, prev} = links;

//   // const selfParts = getUrlParts(self.href);
//   // const nextParts = getUrlParts(next?.href);
//   // const prevParts = getUrlParts(prev?.href);

//   // const resultsBegin = selfParts && selfParts?.page - 1 * selfParts?.perPage;
//   // const resultsEnd = selfParts && selfParts?.page * selfParts?.perPage;
//   // const range =
//   // console.log({self, next, prev}, {selfParts, nextParts, prevParts}, {resultsBegin, resultsEnd});

//   if (!pagination) {
//     return {
//       links: []
//     }
//   }

//   // console.log(pagination)

//   // TODO: make them self from links header
//   const prev = pagination.prev !== undefined && new URL(`./${pagination.prev.page}${decodeURIComponent(url.search)}`, url).toString();
//   const next = pagination.next !== undefined && new URL(`./${pagination.next.page}${decodeURIComponent(url.search)}`, url).toString();

//   const rangeBegin = (pagination.currentPage -1) * pagination.perPage + 1;
//   const rangeEnd = pagination.currentPage * pagination.perPage;

//   return {
//     links: [{
//       href: new URL(`./${pagination.currentPage}${decodeURIComponent(url.search)}`, url).toString(),
//       label: pagination.currentPage || 0,
//       range: [rangeBegin, rangeEnd > pagination.totalCount ? pagination.totalCount : rangeEnd],
//     }],
//     current: 0,
//     prev,
//     next
//   }
// }

const PageLink = (props: PageLinkProps) => {
  const { t } = useTranslation();
  const { href, label, range, index, current, ...restProps } = props;
  const isCurrent = index === current;
  const element = !isCurrent ? "a" : "span";
  const hrefAttr = !isCurrent && { href };
  const count =
    (range && (range[0] === range[1] ? 1 : range[1] - range[0])) || 0;

  const Element = element as ElementType<
    HTMLAttributes<HTMLAnchorElement | HTMLSpanElement>
  >;

  return (
    <Element
      className={clsx(
        "utrecht-pagination__page-link",
        isCurrent && "utrecht-pagination__page-link--current",
      )}
      {...hrefAttr}
      aria-current={isCurrent}
      aria-label={
        range && t(`components.page-and-results-range`, { label, range, count })
      }
      title={range && t(`components.results-range`, { range, count })}
      {...restProps}
    >
      {label}
    </Element>
  );
};

const RelativeLink = (props: RelativeLinkProps) => {
  const { t } = useTranslation();
  const { href, position } = props;

  return (
    <a
      href={href}
      className={clsx(
        "utrecht-pagination__relative-link",
        "utrecht-pagination__relative-link--disabled",
        `utrecht-pagination__relative-link--${position}`,
      )}
      rel={position}
    >
      {t(`components.${position}`)}
    </a>
  );
};

const Pagination = (props: PropsWithChildren<PaginationProps>) => {
  const { t } = useTranslation();
  const { links, current = 0, prev, next, className } = props;

  return (
    <nav
      className={clsx(
        "utrecht-pagination",
        "utrecht-pagination--distanced",
        styles.pagination,
        className,
      )}
      aria-label={t("components.pagination-landmark")}
    >
      {prev && (
        <span className="utrecht-pagination__before">
          <RelativeLink href={String(prev)} position="prev" />
        </span>
      )}
      {/* biome-ignore-start lint/a11y/useSemanticElements: taken from NLDS example */}
      <span
        role="group"
        aria-label={t("components.pages")}
        className="utrecht-pagination__pages"
      >
        {/* biome-ignore-end lint/a11y/useSemanticElements: taken from NLDS example */}
        {links &&
          links.length > 0 &&
          links.map(({ href, label, range }, index) => (
            <PageLink
              href={href}
              label={label}
              range={range}
              index={index}
              current={current}
              key={label}
            />
          ))}
      </span>
      {next && (
        <span className="utrecht-pagination__after">
          <RelativeLink href={String(next)} position="next" />
        </span>
      )}
    </nav>
  );
};

const TranslatedPagination = (props: PaginationProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Pagination {...props} />
    </I18nextProvider>
  );
};

export default TranslatedPagination;
