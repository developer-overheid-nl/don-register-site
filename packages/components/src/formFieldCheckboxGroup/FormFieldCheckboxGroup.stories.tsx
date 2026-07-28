import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldCheckboxOption from "../formFieldCheckboxOption/FormFieldCheckboxOption";
import FormFieldCheckboxGroup from "./FormFieldCheckboxGroup";

const organisationOptions = [
  { value: "kadaster", label: "Kadaster", count: 12, selected: true },
  { value: "geonovum", label: "Geonovum", count: 8, selected: false },
  { value: "logius", label: "Logius", count: 5, selected: false },
];

const meta = {
  title: "Components/Form/FormFieldCheckboxGroup",
  component: FormFieldCheckboxGroup,
  tags: ["autodocs", "re-export", "remixed"],
  args: {
    label: "Organisatie",
    description: "Filter op eigenaar of beheerder van de registratie.",
    children: organisationOptions.map((option) => (
      <FormFieldCheckboxOption
        key={option.value}
        name="organisation"
        value={option.value}
        label={option.label}
        amount={option.count}
        defaultChecked={option.selected}
      />
    )),
  },
} satisfies Meta<typeof FormFieldCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "Kies minimaal één organisatie.",
  },
};
