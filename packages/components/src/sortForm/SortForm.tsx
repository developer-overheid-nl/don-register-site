import {
  FormFieldSelect,
  SelectOption,
} from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import { useId } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import i18n from "../i18n";
import styles from "./styles.module.css";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortFormProps {
  action: string;
  options: SortOption[];
  sortBy?: string;
  sortOrder?: string;
  hiddenFields?: [string, string][];
  className?: string;
}

const SortForm = ({
  action,
  options,
  sortBy = "title",
  sortOrder = "asc",
  hiddenFields = [],
  className,
}: SortFormProps) => {
  const { t } = useTranslation();
  const headingId = useId();

  return (
    <section
      className={clsx(styles.sort, className)}
      aria-labelledby={headingId}
    >
      <Heading id={headingId} level={2} appearanceLevel={3} className="sr-only">
        {t("components.sort")}
      </Heading>
      <form
        id="sort-form"
        action={action}
        method="GET"
        className={styles.form}
        aria-labelledby={headingId}
      >
        {hiddenFields.map(([name, value], index) => (
          <input
            // biome-ignore lint/suspicious/noArrayIndexKey: duplicate query params can share name and value
            key={`${name}-${value}-${index}`}
            type="hidden"
            name={name}
            value={value}
          />
        ))}
        <FormFieldSelect
          name="sortBy"
          label={t("components.sort-by")}
          defaultValue={sortBy}
        >
          {options.map(({ value, label }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </FormFieldSelect>
        <FormFieldSelect
          name="sortOrder"
          label={t("components.sort-order")}
          defaultValue={sortOrder}
        >
          <SelectOption value="asc">
            {t("components.sort-ascending")}
          </SelectOption>
          <SelectOption value="desc">
            {t("components.sort-descending")}
          </SelectOption>
        </FormFieldSelect>
        <Button type="submit" appearance="primary-action-button">
          {t("components.sort-button-label")}
        </Button>
      </form>
    </section>
  );
};

const TranslatedSortForm = (props: SortFormProps) => (
  <I18nextProvider i18n={i18n}>
    <SortForm {...props} />
  </I18nextProvider>
);

export default TranslatedSortForm;
