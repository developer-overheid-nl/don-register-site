import clsx from "clsx";
import { type ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Alert from "../../alert/Alert";
import Fieldset from "../../fieldset/FieldSet";
import FormFieldCheckboxGroup from "../../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldRadioGroup from "../../formFieldRadioGroup/FormFieldRadioGroup";
import FormFieldRadioOption from "../../formFieldRadioOption/FormFieldRadioOption";
import FormFieldTextInput from "../../formFieldTextInput/FormFieldTextInput";
import Icon from "../../iconsSprite/Icon";
import LinkButton from "../../link/LinkButton";
import styles from "../styles.module.css";
import type { FilterComponentProps, SearchSelectFilterData } from "../types";
import OptionToolTip from "./OptionToolTip";

export interface SearchSelectFilterProps
  extends FilterComponentProps<SearchSelectFilterData> {
  /** Render checkboxes (`search-multi-select`) instead of radio buttons (`search-single-select`). */
  multiple?: boolean;
}

/**
 * A long option list with a search field and a "show more" toggle, for the
 * `search-single-select` (radio buttons) and `search-multi-select` (checkboxes)
 * filters. All options stay in the DOM (hidden with CSS), so selected values are
 * always submitted with the surrounding form.
 */
const SearchSelectFilter = ({
  facet,
  multiple = false,
  onChange,
}: SearchSelectFilterProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  // Selected values, tracked client-side so selected options can be kept visible
  const [selectedValues, setSelectedValues] = useState(
    () =>
      new Set(
        facet.options
          .filter((option) => option.selected)
          .map((option) => option.value),
      ),
  );

  const helpId = `${facet.key}-search-help`;
  const showTop = facet.showTop ?? 0;
  const normalizedQuery = query.toLowerCase();

  // `undefined` means no active search
  const searchResults =
    query === ""
      ? undefined
      : facet.options.filter((option) =>
          option.label.toLowerCase().includes(normalizedQuery),
        );

  // Show search results while searching, otherwise fall back to all or the top options
  const visibleOptions =
    searchResults ??
    (showMore ? facet.options : facet.options.slice(0, showTop));

  // Visible options plus the selected options, so a selection never disappears
  const visibleValues = new Set([
    ...visibleOptions.map((option) => option.value),
    ...selectedValues,
  ]);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedValues((current) => {
      if (!multiple) {
        return new Set([value]);
      }
      const next = new Set(current);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return next;
    });
    onChange(event);
  };

  const Group = multiple ? FormFieldCheckboxGroup : FormFieldRadioGroup;
  const Option = multiple ? FormFieldCheckboxOption : FormFieldRadioOption;

  return (
    <Fieldset
      aria-labelledby={`${facet.key}-title`}
      className={styles.searchSelect}
    >
      <FormFieldTextInput
        className={styles.searchInput}
        type="search"
        label={
          <Icon name="zoek-inline" aria-label={t("components.search-label")} />
        }
        aria-describedby={helpId}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      >
        <div className="sr-only" id={helpId}>
          {t("components.filter-search-select-help")}
        </div>
      </FormFieldTextInput>
      <Group
        className={clsx(styles.scrollArea, styles[showMore ? "more" : "less"])}
      >
        {facet.options.map((option) => (
          <Option
            key={option.value}
            label={option.label}
            name={facet.key}
            value={option.value}
            defaultChecked={option.selected}
            amount={option.count}
            className={clsx(!visibleValues.has(option.value) && styles.hidden)}
            onChange={handleOptionChange}
          >
            <OptionToolTip option={option} />
          </Option>
        ))}
      </Group>
      {searchResults?.length === 0 ? (
        <Alert type="warning" role="status">
          {t("components.no-options-found")}
        </Alert>
      ) : null}
      {!searchResults && facet.options.length > showTop ? (
        <div className={styles.moreButton}>
          <LinkButton
            appearance="small"
            onClick={() => setShowMore((current) => !current)}
          >
            {t(showMore ? "components.show-less" : "components.show-more")}
            <Icon
              name="delta-naar-rechts-inline"
              className={styles[showMore ? "up" : "down"]}
              aria-hidden
            />
          </LinkButton>
        </div>
      ) : null}
    </Fieldset>
  );
};

export default SearchSelectFilter;
