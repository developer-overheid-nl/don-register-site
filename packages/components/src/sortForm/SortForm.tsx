import {
  FormFieldSelect,
  SelectOption,
} from "@rijkshuisstijl-community/components-react";
import { type ChangeEvent, useId, useRef } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Heading from "../heading/Heading";
import i18n from "../i18n";
import styles from "./styles.module.css";

export type SortOrder = "asc" | "desc";

export interface SortOption {
  sortBy: string;
  sortOrder: SortOrder;
  label: string;
}

export interface SortFormProps {
  action: string;
  options: SortOption[];
  sortBy?: string | null;
  sortOrder?: string | null;
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
  const sortByInputRef = useRef<HTMLInputElement>(null);
  const sortOrderInputRef = useRef<HTMLInputElement>(null);
  const selectedOption =
    options.find(
      (option) => option.sortBy === sortBy && option.sortOrder === sortOrder,
    ) ?? options[0];
  const selectedValue = selectedOption
    ? `${selectedOption.sortBy}:${selectedOption.sortOrder}`
    : undefined;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find(
      ({ sortBy, sortOrder }) =>
        `${sortBy}:${sortOrder}` === event.currentTarget.value,
    );

    if (!option || !sortByInputRef.current || !sortOrderInputRef.current) {
      return;
    }

    sortByInputRef.current.value = option.sortBy;
    sortOrderInputRef.current.value = option.sortOrder;
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <section className={className} aria-labelledby={headingId}>
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
        <input
          ref={sortByInputRef}
          type="hidden"
          name="sortBy"
          defaultValue={selectedOption?.sortBy}
        />
        <input
          ref={sortOrderInputRef}
          type="hidden"
          name="sortOrder"
          defaultValue={selectedOption?.sortOrder}
        />
        <FormFieldSelect
          label={t("components.sort-by")}
          defaultValue={selectedValue}
          onChange={handleChange}
        >
          {options.map(({ sortBy, sortOrder, label }) => (
            <SelectOption
              key={`${sortBy}:${sortOrder}`}
              value={`${sortBy}:${sortOrder}`}
            >
              {label}
            </SelectOption>
          ))}
        </FormFieldSelect>
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
