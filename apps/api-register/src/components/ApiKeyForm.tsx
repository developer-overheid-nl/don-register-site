import { actions, isInputError } from "astro:actions";
import { withState } from "@astrojs/react/actions";
import {
  Alert,
  AlignBox,
  Block,
  Button,
  CopyButton,
  Fieldset,
  FormFieldLabel,
  FormFieldTextInput,
  Paragraph,
  ReadOnlyTextInput,
} from "@developer-overheid-nl/don-register-components";
import { CustomEvent, ErrorTracking } from "@piwikpro/react-piwik-pro";
import { Activity, useActionState, useEffect } from "react";
import styles from "./ApiKeyForm.module.css";

interface ApiKeyFormProps {
  labels: {
    title: string;
    intro: string;
    form: {
      emailLabel: string;
      submitLabel?: string;
      submittingLabel?: string;
    };
    keyShownLabel: string;
    keyShownWarning: string;
  };
}

const ApiKeyForm = ({ labels }: ApiKeyFormProps) => {
  useEffect(() => {
    void import("altcha");
    void import("altcha/i18n/nl");
  }, []);

  const [{ data, error }, action, pending] = useActionState(
    withState(actions.keyRequest),
    {
      data: { email: "", key: "" },
      error: undefined,
    },
  );

  const inputErrors = isInputError(error) ? error.fields : {};

  // Piwik Pro event tracking, only on the client side to avoid hydration issues.
  if (!import.meta.env.SSR) {
    let action: string;
    switch (true) {
      case pending:
        action = "Submitting";
        break;
      case !!error:
        action = "Error";
        break;
      case !!data?.key:
        action = "Success";
        break;
      default:
        action = "View";
    }
    CustomEvent.trackEvent("Forms", action, "API Key Request Form");

    if (action === "Error") {
      ErrorTracking.trackError(
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }

  return (
    <Block appearance="outlined" layout="flex-col">
      <form id="get-api-key" action={action} className={styles.apiKeyForm}>
        <Fieldset legend={labels.title}>
          <Paragraph>{labels.intro}</Paragraph>
          <AlignBox align="bottom-left" gap="small">
            <FormFieldTextInput
              id="input-email"
              label={labels.form.emailLabel}
              name="email"
              type="email"
              autoComplete="email"
              inputRequired
              invalid={!!inputErrors.email}
              errorMessage={inputErrors.email?.join(", ")}
              size={42}
              defaultValue={data?.email || ""}
            />
            <Button
              type="submit"
              appearance="primary-action-button"
              disabled={pending}
            >
              {pending
                ? labels.form.submittingLabel
                : labels.form.submitLabel || "Verzenden"}
            </Button>
          </AlignBox>
          <altcha-widget
            id="altcha-widget"
            challengeurl="/api/altcha/challenge"
            name="altcha"
            auto="onsubmit"
            language="nl"
            hidefooter
            floating
          ></altcha-widget>
          {error && error?.type !== "AstroActionInputError" ? (
            <Alert type="error">{error?.message}</Alert>
          ) : null}
        </Fieldset>
      </form>
      <Activity mode={data?.key ? "visible" : "hidden"}>
        <AlignBox align="top-left" direction="column" gap="small">
          <FormFieldLabel htmlFor="api-key">
            {labels.keyShownLabel}
          </FormFieldLabel>
          <AlignBox align="left" gap="small">
            <ReadOnlyTextInput
              id="api-key"
              value={data?.key || ""}
              size={42}
              fontVariant="monospace"
            />
            <CopyButton text={data?.key} />
          </AlignBox>
        </AlignBox>
        <Alert type="info">{labels.keyShownWarning}</Alert>
      </Activity>
    </Block>
  );
};

export default ApiKeyForm;
