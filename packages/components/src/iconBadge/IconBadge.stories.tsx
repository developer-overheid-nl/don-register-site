import type { Meta, StoryObj } from "@storybook/react-vite";
import IconBadge from "./IconBadge";

/**
 * IconBadge toont een icoon-badge voor een levensfase-status (actief,
 * verouderd, aflopend of uit gebruik genomen).
 *
 * Verouderd: API Register-specifiek en niet meer in gebruik.
 */
const meta = {
  title: "Components/IconBadge",
  component: IconBadge,
  tags: ["autodocs", "deprecated", "custom"],
  argTypes: {
    name: {
      control: "select",
      options: ["active", "deprecated", "sunset", "retired"],
    },
  },
  args: {
    name: "active",
  },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Deprecated: Story = {
  args: {
    name: "deprecated",
  },
};

export const Sunset: Story = {
  args: {
    name: "sunset",
  },
};

export const Retired: Story = {
  args: {
    name: "retired",
  },
};
