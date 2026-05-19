import clsx from "clsx";
import type { ElementType, HTMLAttributes, PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n";
import styles from "./styles.module.css";

/** @deprecated use only boolean */
type currentNumber = number;
interface PageLinkProps
  extends Omit<
    HTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>,
    "onAbort"
  > {
  href: string;
  label: number | string;
  range?: [number, number];
  index: number;
  current: boolean | currentNumber;
}

interface RelativeLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label?: string | number;
  position: "prev" | "next";
}

interface AbsoluteLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label?: string | number;
  position: "first" | "last";
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  links: Array<{
    href: PageLinkProps["href"];
    label: PageLinkProps["label"];
    current: PageLinkProps["current"];
    /** Range of shown items on this page; [begin, end] */
    range?: PageLinkProps["range"];
  }>;
  first?:
    | {
        href: AbsoluteLinkProps["href"];
        label: AbsoluteLinkProps["label"];
      }
    | false;
  prev?:
    | {
        href: RelativeLinkProps["href"];
        label?: RelativeLinkProps["label"];
      }
    | false;
  ellipsisBefore?: boolean;
  current?: PageLinkProps["current"];
  ellipsisAfter?: boolean;
  next?:
    | {
        href: RelativeLinkProps["href"];
        label?: RelativeLinkProps["label"];
      }
    | false;
  last?:
    | {
        href: AbsoluteLinkProps["href"];
        label: AbsoluteLinkProps["label"];
      }
    | false;
  className?: string;
}

const PageLink = (props: PageLinkProps) => {
  const { t } = useTranslation();
  const { href, label, range, index, current, ...restProps } = props;
  const isCurrent = typeof current === "boolean" ? current : index === current;
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
  const { href, label, position } = props;

  return (
    <a
      href={href}
      className={clsx(
        "utrecht-pagination__relative-link",
        `utrecht-pagination__relative-link--${position}`,
      )}
      rel={position}
      aria-label={t(`components.position-page`, {
        position,
        label,
        context: label ? "with-label" : undefined,
      })}
      title={t(`components.position-page`, {
        position,
        label,
        context: label ? "with-label" : undefined,
      })}
    >
      {t(`components.${position}`)}
    </a>
  );
};

const AbsoluteLink = (props: AbsoluteLinkProps) => {
  const { t } = useTranslation();
  const { href, label, position } = props;

  const cssPositions = {
    first: "prev",
    last: "next",
  };

  return (
    <a
      href={href}
      className={clsx(
        "utrecht-pagination__page-link",
        `utrecht-pagination__relative-link--${cssPositions[position]}`,
      )}
      rel={position}
      aria-label={t(`components.position-page`, {
        position,
        label,
        context: label ? "with-label" : undefined,
      })}
      title={t(`components.position-page`, { position })}
    >
      {label}
    </a>
  );
};

const Ellipsis = ({ position }: { position: "prev" | "next" }) => {
  return (
    <span
      className={clsx(
        styles.pagination__ellipsis,
        `utrecht-pagination__relative-link--${position}`,
      )}
      aria-hidden="true"
    >
      &hellip;
    </span>
  );
};

const Pagination = (props: PropsWithChildren<PaginationProps>) => {
  const { t } = useTranslation();
  const {
    links,
    first,
    prev,
    ellipsisBefore,
    ellipsisAfter,
    next,
    last,
    className,
  } = props;

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
          <RelativeLink
            href={String(prev.href)}
            label={prev.label}
            position="prev"
          />
        </span>
      )}
      {first && (
        <span className="utrecht-pagination__before">
          <AbsoluteLink
            href={String(first.href)}
            label={first.label}
            position="first"
          />
          {ellipsisBefore && <Ellipsis position="prev" />}
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
          links.map(({ href, label, range, current }, index) => (
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
      {last && (
        <span className="utrecht-pagination__after">
          {ellipsisAfter && <Ellipsis position="next" />}
          <AbsoluteLink
            href={String(last.href)}
            label={last.label}
            position="last"
          />
        </span>
      )}
      {next && (
        <span className="utrecht-pagination__after">
          <RelativeLink
            href={String(next.href)}
            label={next.label}
            position="next"
          />
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
