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
import { Activity, useActionState } from "react";

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
  const [{ data, error }, action, pending] = useActionState(
    withState(actions.keyRequest),
    {
      data: { email: "", key: "" },
      error: undefined,
    },
  );

  const inputErrors = isInputError(error) ? error.fields : {};

  return (
    <Block appearance="outlined" layout="flex-col">
      <form id="get-api-key" action={action}>
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
              {pending ? labels.form.submittingLabel : labels.form.submitLabel || "Submit"}
            </Button>
          </AlignBox>
          {error && error?.type !== 'AstroActionInputError' ? (<Alert type="error">{error?.message}</Alert>) : null}
        </Fieldset>
      </form>
      <Activity mode={data?.key ? "visible" : "hidden"}>
        <AlignBox align="top-left" direction="column" gap="small">
          <FormFieldLabel htmlFor="api-key">{labels.keyShownLabel}</FormFieldLabel>
          <AlignBox align="left" gap="small">
            <ReadOnlyTextInput id="api-key" value={data?.key || ""} size={42} fontVariant="monospace" />
            <CopyButton text={data?.key} />
          </AlignBox>
        </AlignBox>
        <Alert type="info">
          {labels.keyShownWarning}
        </Alert>
      </Activity>
    </Block>
  );
};

export default ApiKeyForm;
