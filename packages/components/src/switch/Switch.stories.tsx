import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import Switch from "./Switch";

/**
 * Switch is een aan/uit-schakelaar. In `explicit`-modus wordt de schakelaar
 * gerenderd als twee losse radio-opties (aan/uit) in plaats van één toggle,
 * met een aparte `aria-labelledby` in plaats van `aria-label`. Die modus kent
 * drie standen: aan, uit en onbepaald (nog geen keuze, bolletje in het midden).
 */
const meta = {
  title: "Components/Form/FormFieldParts/Switch",
  component: Switch,
  tags: ["autodocs", "custom"],
  args: {
    name: "toggle-example",
    value: "true",
    "aria-label": "Toggle voorbeeld",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("switch", { name: "Toggle voorbeeld" });
    await expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);

    // The name stays the same; the state is announced by the switch role
    await expect(
      canvas.getByRole("switch", { name: "Toggle voorbeeld" }),
    ).toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("switch", { name: "Toggle voorbeeld" }),
    ).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

const explicitStory = {
  decorators: [
    (Story) => (
      <>
        <span id="switch-explicit-label" className="utrecht-form-label">
          Heeft publiccode.yml
        </span>
        <Story />
      </>
    ),
  ],
  args: {
    "aria-label": undefined,
    "aria-labelledby": "switch-explicit-label",
    explicit: true,
    value: ["true", "false"],
    labels: { on: "Aan", off: "Uit" },
  },
} satisfies Story;

// The track a mouse hits at the center of the switch, and where its thumb sits
const getVisibleState = (canvasElement: HTMLElement) => {
  const rect = (
    canvasElement.querySelector(".utrecht-form-toggle") as HTMLElement
  ).getBoundingClientRect();
  const track = (
    document.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    ) as HTMLElement
  ).closest("label") as HTMLLabelElement;
  const trackRect = track.getBoundingClientRect();
  const thumbRect = (
    track.querySelector(".utrecht-form-toggle__thumb") as HTMLElement
  ).getBoundingClientRect();
  const offset =
    thumbRect.left - trackRect.left - (trackRect.right - thumbRect.right);
  const thumb =
    Math.abs(offset) <= 1 ? "middle" : offset < 0 ? "left" : "right";
  return { track, thumb };
};

// Remember the checked state of all inputs, so a play test can leave the story as it started
const rememberChecked = (canvasElement: HTMLElement) => {
  const initial = [...canvasElement.querySelectorAll("input")].map(
    (input) => [input, input.checked] as const,
  );
  return () => {
    for (const [input, checked] of initial) {
      input.checked = checked;
    }
  };
};

export const ExplicitIndeterminate: Story = {
  ...explicitStory,
  name: "Explicit: onbepaald",
  play: async ({ canvas, canvasElement }) => {
    const restore = rememberChecked(canvasElement);
    const on = canvas.getByRole("radio", { name: "Aan" });
    const off = canvas.getByRole("radio", { name: "Uit" });
    await expect(on).toHaveAttribute("value", "true");
    await expect(off).toHaveAttribute("value", "false");
    await expect(on).not.toBeChecked();
    await expect(off).not.toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("middle");

    await userEvent.click(getVisibleState(canvasElement).track);

    await expect(on).toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("right");

    restore();
    await expect(getVisibleState(canvasElement).thumb).toBe("middle");
  },
};

export const ExplicitOn: Story = {
  ...explicitStory,
  name: "Explicit: aan",
  args: {
    ...explicitStory.args,
    defaultChecked: true,
  },
  play: async ({ canvas, canvasElement }) => {
    const restore = rememberChecked(canvasElement);
    const on = canvas.getByRole("radio", { name: "Aan" });
    const off = canvas.getByRole("radio", { name: "Uit" });
    await expect(on).toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("right");

    await userEvent.click(getVisibleState(canvasElement).track);

    await expect(off).toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("left");

    restore();
    await expect(getVisibleState(canvasElement).thumb).toBe("right");
  },
};

export const ExplicitOff: Story = {
  ...explicitStory,
  name: "Explicit: uit",
  args: {
    ...explicitStory.args,
    defaultChecked: false,
  },
  play: async ({ canvas, canvasElement }) => {
    const restore = rememberChecked(canvasElement);
    const on = canvas.getByRole("radio", { name: "Aan" });
    const off = canvas.getByRole("radio", { name: "Uit" });
    await expect(off).toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("left");

    await userEvent.click(getVisibleState(canvasElement).track);

    await expect(on).toBeChecked();
    await expect(getVisibleState(canvasElement).thumb).toBe("right");

    restore();
    await expect(getVisibleState(canvasElement).thumb).toBe("left");
  },
};
