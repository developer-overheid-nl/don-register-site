import clsx from "clsx";
import type { ElementType, HTMLAttributes, JSX, PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import styles from './styles.module.css';
import i18n from "../i18n";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  links: Array<{
    href: PageLinkProps['href'],
    label: PageLinkProps['label'],
    /** Range of shown items on this page; [begin, end] */
    range?: PageLinkProps['range'], 
  }>;
  current?: PageLinkProps['current'];
  prev?: string | boolean;
  next?: string | boolean;
  className?: string;
}

interface PageLinkProps extends Omit<HTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>, 'onAbort'> {
  href: string;
  label: number | string;
  range?: [number, number];
  index: number;
  current: number;
}

interface RelativeLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  position: 'prev'|'next';
}

const PageLink = (props: PageLinkProps) => { 
  const { t } = useTranslation();
  const {href, label, range, index, current, ...restProps} = props;
  const isCurrent = index == current;
  const element =  !isCurrent ? 'a' : 'span';
  const hrefAttr = !isCurrent && {href};
  const count = range && (range[0] === range[1] ? 1 : range[1] - range[0]) || 0;

  const Element = element as ElementType<HTMLAttributes<HTMLAnchorElement | HTMLSpanElement>>;

  return (
    <Element 
      className={clsx('utrecht-pagination__page-link', isCurrent && 'utrecht-pagination__page-link--current')} 
      {...hrefAttr}
      aria-current={isCurrent} 
      aria-label={range && t(`components.page-and-results-range`, {label, range, count})}
      title={range && t(`components.results-range`, {range, count})}
      {...restProps}
    >{label}</Element>
  )
}

const RelativeLink = (props: RelativeLinkProps) => {
  const { t } = useTranslation();
  const {href, position} = props;

  return (
    <a 
      href={href}
      className={clsx(
        'utrecht-pagination__relative-link', 
        'utrecht-pagination__relative-link--disabled', 
        `utrecht-pagination__relative-link--${position}`
      )}
      rel={position}
    >
      {t(`components.${position}`)}
    </a>
  );
}

const Pagination = (props: PropsWithChildren<PaginationProps>) => {
  const { t } = useTranslation();
  const { links, current = 0, prev, next, className } = props;

  return (
    <nav className={clsx(
        'utrecht-pagination', 
        'utrecht-pagination--distanced', 
        styles.pagination, 
        className
      )}
      aria-label={t('components.pagination-landmark')}>
      {prev && (
        <span className="utrecht-pagination__before">
          <RelativeLink href={String(prev)} position="prev" />
        </span>
      )}
      <span role="group" aria-label={t('components.pages')} className="utrecht-pagination__pages">
        {links && links.length > 0 && links.map(({href, label, range}, index) => (
          <PageLink href={href} label={label} range={range} index={index} current={current} key={index} />
        ))}
      </span>
      {next && (
        <span className="utrecht-pagination__after">
          <RelativeLink href={String(next)} position="next" />
        </span>
      )}
    </nav>
  );
}

const TranslatedPagination = (props: PaginationProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Pagination {...props} />
    </I18nextProvider>
  )
}

export default TranslatedPagination;
