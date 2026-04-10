import { actions, isInputError } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import {
  Button,
  FacetFilters,
  Icon,
  Overlay,
} from "@developer-overheid-nl/don-register-components";
import clsx from "clsx";
import { startTransition, useActionState, useRef, useState } from "react";
import styles from "./FacetFiltersForm.module.css";

const FacetFiltersForm = (props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { filters, action: formAction, method: formMethod } = props;
  const [{ data, error }, action, pending] = useActionState(
    withState(actions.getFilters),
    {
      data: filters,
      error: undefined,
    },
  );
  const [touched, setTouched] = useState(pending);

  if (!touched && pending) {
    setTouched(true);
  }

  const inputErrors = isInputError(error) ? error.fields : {};

  const handleChange = () => {
    console.log(
      "FacetFiltersForm filter changed, triggering getFilters action...",
    );
    startTransition(() => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        action(formData);
      }
    });
  };

  console.log("FacetFiltersForm state:", {
    data,
    filters,
    error,
    pending,
    inputErrors,
  });

  return (
    <div className="facet-filters-wrapper">
      {/* TODO: i18next */}
      <form
        id="get-filters"
        className={styles.facetFiltersForm}
        ref={formRef}
        action={formAction}
        method={formMethod}
      >
        <Overlay active={pending} />
        <FacetFilters
          id="Xfacetfilters"
          title="Filters"
          filters={data}
          onFilterChange={handleChange}
        />
        <Button
          appearance="primary-action-button"
          type="submit"
          className={clsx(styles.filterButton, touched && styles.touched)}
          disabled={pending}
        >
          Filter
          <Icon name="trechter" slot="icon" width="1.5rem" height="1.5rem" />
        </Button>
      </form>
    </div>
  );
};

export default FacetFiltersForm;
