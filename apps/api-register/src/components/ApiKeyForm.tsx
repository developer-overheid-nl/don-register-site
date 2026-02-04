import {
  /*type ActionError, type ActionInputError,*/ actions,
  isInputError,
} from "astro:actions";
import { withState } from "@astrojs/react/actions";
import {
  Alert,
  AlignBox,
  Block,
  Button,
  CopyButton,
  Fieldset,
  FormFieldTextInput,
  Paragraph,
  ReadOnlyTextInput,
} from "@developer-overheid-nl/don-register-components";
import { Activity, useActionState } from "react";

const ApiKeyForm = () => {
  const [{ data, error }, action, pending] = useActionState(
    withState(actions.keyRequest),
    {
      data: { email: "", key: "" },
      error: undefined,
      // error: undefined as
      //   | ActionError
      //   | ActionInputError<Record<"email", [string]>>
      //   | undefined,
    },
  );

  const inputErrors = isInputError(error) ? error.fields : {};

  return (
    <Block appearance="outlined" layout="flex-col">
      <form id="get-api-key" action={action}>
        <Fieldset legend={"T:pages.get-key-form"}>
          <Paragraph>T: beschrijving en wat we doen met e-mail</Paragraph>
          <AlignBox align="bottom-left" gap="small">
            <FormFieldTextInput
              id="input-email"
              label="T:Uw e-mailadres"
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
              {pending ? `T:Aanvraag verstuurd` : `T:Verstuur aanvraag`}
            </Button>
          </AlignBox>
          {error && error?.type !== "AstroActionInputError" ? (
            <Alert type="error">{error?.message}</Alert>
          ) : null}
        </Fieldset>
      </form>
      <Activity mode={data?.key ? "visible" : "hidden"}>
        <Paragraph>T: Hieronder ziet u uw code, kopieer deze nu...</Paragraph>
        <AlignBox align="left" gap="small">
          <ReadOnlyTextInput id="api-key" value={data?.key || ""} size={42} />
          <CopyButton text={data?.key} />
        </AlignBox>
      </Activity>
    </Block>
  );
};

export default ApiKeyForm;
