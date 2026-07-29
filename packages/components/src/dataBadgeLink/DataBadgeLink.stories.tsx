import type { Meta, StoryObj } from "@storybook/react-vite";
import Block from "../block/Block";
import DataBadgeLink from "./DataBadgeLink";

const CrossIcon = () => (
  <svg
    aria-hidden="true"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L11 11M11 1L1 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const meta = {
  title: "Components/DataBadgeLink",
  component: DataBadgeLink,
  tags: ["autodocs", "remixed"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["primary", "outlined", "subtle", "link"],
    },
  },
  args: {
    href: "#",
    appearance: "primary",
    children: "OAS 3.1 (.json)",
  },
  decorators: [
    (Story) => (
      <Block layout="flex-row" appearance="clear">
        <Story />
      </Block>
    ),
  ],
} satisfies Meta<typeof DataBadgeLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outlined: Story = {
  args: {
    appearance: "outlined",
  },
};

export const Subtle: Story = {
  args: {
    appearance: "subtle",
  },
};

export const LinkAppearance: Story = {
  name: "Link",
  args: {
    appearance: "link",
  },
};

export const WithIcon: Story = {
  args: {
    appearance: "subtle",
    icon: <CrossIcon />,
    children: "Kadaster",
  },
};

export const WithHelperText: Story = {
  args: {
    appearance: "subtle",
    icon: <CrossIcon />,
    helperText: "Verwijder filter",
    children: "Kadaster",
  },
};

export const AllAppearances: Story = {
  args: {
    children: "",
  },
  render: () => (
    <>
      <DataBadgeLink href="#" appearance="primary">
        Primary
      </DataBadgeLink>
      <DataBadgeLink href="#" appearance="outlined">
        Outlined
      </DataBadgeLink>
      <DataBadgeLink href="#" appearance="subtle">
        Subtle
      </DataBadgeLink>
      <DataBadgeLink href="#" appearance="link">
        Link
      </DataBadgeLink>
    </>
  ),
};

export const FilterExample: Story = {
  name: "Actief filter (voorbeeld)",
  args: {
    appearance: "subtle",
    icon: <CrossIcon />,
    helperText: "Verwijder filter",
    role: "menuitem",
    children: "Geonovum",
  },
  render: (args) => (
    <div role="menu" aria-label="Actieve filters">
      <div role="none">
        <DataBadgeLink {...args} />
      </div>
    </div>
  ),
};
