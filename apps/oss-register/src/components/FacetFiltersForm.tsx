import { actions, isInputError } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import {
  Button,
  FacetFilters,
  type FilterData,
  Icon,
  Overlay,
} from "@developer-overheid-nl/don-register-components";
import clsx from "clsx";
import { startTransition, useActionState, useRef, useState } from "react";
import styles from "./FacetFiltersForm.module.css";

interface FacetFiltersFormProps {
  filters: FilterData[];
  action: string;
  method: string;
  labels: {
    filtersTitle: string;
    filterButtonLabel: string;
  };
}

const FacetFiltersForm = (props: FacetFiltersFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { filters, action: formAction, method: formMethod, labels } = props;
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

  const _inputErrors = isInputError(error) ? error.fields : {};

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

  return (
    <div className="facet-filters-wrapper">
      <form
        id="get-filters"
        className={styles.facetFiltersForm}
        ref={formRef}
        action={formAction}
        method={formMethod}
      >
        <Overlay active={pending} />
        <FacetFilters
          id="facetfilters"
          title={labels.filtersTitle}
          filters={data}
          onFilterChange={handleChange}
        />
        <Button
          appearance="primary-action-button"
          type="submit"
          className={clsx(styles.filterButton, touched && styles.touched)}
          disabled={pending}
          title="Enter ↵"
        >
          {labels?.filterButtonLabel}
          <Icon name="trechter" slot="icon" width="1.5rem" height="1.5rem" />
        </Button>
      </form>
    </div>
  );
};

export default FacetFiltersForm;
