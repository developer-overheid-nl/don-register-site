import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldRadioOption from "../formFieldRadioOption/FormFieldRadioOption";
import FormFieldRadioGroup from "./FormFieldRadioGroup";

const lifecycleOptions = [
  { value: "active", label: "Actief", count: 18, selected: true },
  { value: "deprecated", label: "Verouderd", count: 2, selected: false },
];

/**
 * FormFieldRadioGroup groepeert een set `FormFieldRadioOption`-velden onder
 * een gezamenlijk label, beschrijving en foutmelding.
 *
 * ## Wijzigingen tov RHC:
 * - Alleen een extra CSS-klasse; geen wijzigingen in props.
 */
const meta = {
  title: "Components/Form/FormFieldRadioGroup",
  component: FormFieldRadioGroup,
  tags: ["autodocs", "remixed"],
  args: {
    label: "Levensfase",
    description: "Toon alleen registraties met deze levensfase.",
    children: (
      <>
        <FormFieldRadioOption
          key="none"
          name="lifecycle"
          value=""
          label="Alles"
        />
        {lifecycleOptions.map((option) => (
          <FormFieldRadioOption
            key={option.value}
            name="lifecycle"
            value={option.value}
            label={option.label}
            amount={option.count}
            defaultChecked={option.selected}
          />
        ))}
      </>
    ),
  },
} satisfies Meta<typeof FormFieldRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "Kies een levensfase.",
  },
};
