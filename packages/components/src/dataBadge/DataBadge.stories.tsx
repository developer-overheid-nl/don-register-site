import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "../iconsSprite/Icon";
import DataBadge from "./DataBadge";

/**
 * Een data badge toont een korte, niet-interactieve waarde of status, zoals
 * een label bij een API of repository.
 */
const meta = {
  title: "Components/DataBadge",
  component: DataBadge,
  tags: ["autodocs", "remixed"],
  args: {
    children: "Kadaster",
  },
  argTypes: {
    appearance: {
      control: "select",
      options: [
        "primary",
        "outlined",
        "subtle",
        "link",
        "error",
        "warning",
        "hint",
      ],
    },
    value: {
      control: "text",
      description:
        "Machine-leesbare waarde; rendert de badge als `<data value>`.",
    },
    dateTime: {
      control: "text",
      description:
        "Machine-leesbare datum of tijd; rendert de badge als `<time datetime>`.",
    },
  },
} satisfies Meta<typeof DataBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    children: "1.000.000",
    value: "1000000",
  },
};

export const WithDateTime: Story = {
  args: {
    children: "19 november 2026",
    dateTime: "2026-11-19",
  },
};

export const Outlined: Story = {
  args: { appearance: "outlined" },
};

export const Subtle: Story = {
  args: { appearance: "subtle" },
};

export const Link: Story = {
  args: { appearance: "link" },
};

// `Error` zou de globale `Error` overschrijven, vandaar de export-naam.
export const ErrorBadge: Story = {
  name: "Error",
  args: { appearance: "error", children: "Verouderd" },
};

export const Warning: Story = {
  args: { appearance: "warning", children: "Binnenkort uit gebruik" },
};

export const Hint: Story = {
  args: { appearance: "hint", children: "Nieuw" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Afgerond <Icon name="active" aria-hidden />
      </>
    ),
  },
};
