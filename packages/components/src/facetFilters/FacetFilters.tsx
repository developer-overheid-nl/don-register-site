import { Heading } from "@rijkshuisstijl-community/components-react";
import clsx from "clsx";
import type { HTMLProps, PropsWithChildren } from "react";
// import { I18nextProvider, useTranslation } from "react-i18next";
import Alert from "../alert/Alert";
import DataBadgeLink from "../dataBadgeLink/DataBadgeLink";
import FormFieldCheckboxGroup from "../formFieldCheckboxGroup/FormFieldCheckboxGroup";
import FormFieldCheckboxOption from "../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldTextInput from "../formFieldTextInput/FormFieldTextInput";
import i18n from "../i18n";
// import Icon from "../iconsSprite/Icon";
import styles from "./styles.module.css";

// TODO: fix props type
export interface FacetFiltersProps extends HTMLProps<HTMLDivElement> {
  routing?: Record<string, any>;
  data: any;
  headers: any;
  error: any;
  status?: number;
  statusText?: string;
}

const FacetFilters = (props: PropsWithChildren<FacetFiltersProps>) => {
  const { data } = props;

  return (
    <div className={clsx([styles.facetFilters, props.className])}>
      <Heading level={2} appearanceLevel={3}>
        Facet Filters
      </Heading>
      <pre
        style={{ maxBlockSize: 250, maxInlineSize: 300, overflow: "scroll" }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
      {data.map((facet: any) => (
        <div className={styles.facet} key={facet.key}>
          <Heading level={3} appearanceLevel={5}>
            {facet.label}
          </Heading>
          {facet.type === "toggle" ? (
            <FormFieldCheckboxOption label="JA" amount={facet.count} />
          ) : null}
          {/* TODO: Date selector */}
          {facet.type === "date" ? <div>TODO</div> : null}
          {facet.type === "multi-select" ? (
            <FormFieldCheckboxGroup>
              {facet.options.map((option: any) => (
                <FormFieldCheckboxOption
                  key={option.value}
                  label={option.label}
                  amount={option.count}
                />
              ))}
            </FormFieldCheckboxGroup>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default FacetFilters;
