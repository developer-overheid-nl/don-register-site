import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

/**
 * Een button biedt de mogelijkheid om een actie uit te voeren.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "re-export"],
  args: {
    children: "API toevoegen",
    type: "button",
  },
  argTypes: {
    appearance: {
      control: "select",
      options: [
        "primary-action-button",
        "secondary-action-button",
        "subtle-button",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appearance: "primary-action-button",
  },
};

export const Secondary: Story = {
  args: {
    appearance: "secondary-action-button",
    children: "Annuleren",
  },
};

export const Subtle: Story = {
  args: {
    appearance: "subtle-button",
    children: "Meer opties",
  },
};

export const Disabled: Story = {
  args: {
    appearance: "primary-action-button",
    children: "Bezig met laden",
    disabled: true,
  },
};
