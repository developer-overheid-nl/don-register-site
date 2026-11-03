import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import FormFieldSwitch from "./FormFieldSwitch";

/**
 * FormFieldSwitch is een aan/uit-schakelaar binnen een formulierveld,
 * bijvoorbeeld voor een boolean filter. Ondersteunt een `explicit`-modus met
 * twee losse radio-opties (aan/uit) in plaats van één toggle. Is in die modus
 * nog geen optie gekozen, dan staat de schakelaar onbepaald (bolletje in het
 * midden); de eerste klik zet hem aan.
 */
const meta = {
  title: "Components/Form/FormFieldSwitch",
  component: FormFieldSwitch,
  tags: ["autodocs", "custom"],
  args: {
    label: "",
    labelledById: "publiccode-label",
    labels: { on: "Aan", off: "Uit" },
    name: "publiccode",
    value: "true",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    explicit: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <>
        <span id="publiccode-label" className="utrecht-form-label">
          Heeft publiccode.yml
        </span>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof FormFieldSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAmount: Story = {
  args: {
    amount: 9,
  },
};

export const CheckedOn: Story = {
  args: {
    amount: 9,
    defaultChecked: true,
  },
};

export const Explicit: Story = {
  name: "Explicit (aan/uit als losse opties)",
  args: {
    explicit: true,
    amount: 9,
    value: ["true", "false"],
  },
  play: async ({ canvas, canvasElement }) => {
    const on = canvas.getByRole<HTMLInputElement>("radio", { name: "Aan" });
    const off = canvas.getByRole<HTMLInputElement>("radio", { name: "Uit" });
    await expect(on).not.toBeChecked();
    await expect(off).not.toBeChecked();

    // Whatever is on top at the center of the switch, like a mouse would hit
    const getTopmost = () => {
      const rect = (
        canvasElement.querySelector(".utrecht-form-toggle") as HTMLElement
      ).getBoundingClientRect();
      return document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      ) as HTMLElement;
    };
    const clickSwitch = () => userEvent.click(getTopmost());

    // Indeterminate: with nothing selected the thumb sits in the middle
    const track = getTopmost().closest("label") as HTMLElement;
    const trackRect = track.getBoundingClientRect();
    const thumbRect = (
      track.querySelector(".utrecht-form-toggle__thumb") as HTMLElement
    ).getBoundingClientRect();
    await expect(
      Math.abs(
        thumbRect.left - trackRect.left - (trackRect.right - thumbRect.right),
      ),
    ).toBeLessThanOrEqual(1);

    // The first click must select "on"
    await clickSwitch();
    await expect(on).toBeChecked();

    await clickSwitch();
    await expect(off).toBeChecked();

    // Leave the story in its starting (indeterminate) state
    on.checked = false;
    off.checked = false;
  },
};
