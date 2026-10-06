import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonAction from "./ButtonAction";

/**
 * Een ButtonAction is een link die eruitziet als een knop. Gebruik deze als
 * call to action die naar een andere pagina leidt, zoals "API toevoegen".
 * Voor acties op de huidige pagina gebruik je `Button`.
 */
const meta = {
  title: "Components/ButtonAction",
  component: ButtonAction,
  tags: ["autodocs", "remixed"],
  args: {
    href: "/apis/toevoegen",
    children: "API toevoegen",
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
} satisfies Meta<typeof ButtonAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithIcon: Story = {
  name: "Met icoon",
  args: {
    icon: "plus-cirkel-inline",
  },
};

export const WithoutIconEnd: Story = {
  name: "Zonder icoon",
  args: {
    iconEnd: false,
  },
};

export const Secondary: Story = {
  args: {
    appearance: "secondary-action-button",
    href: "/repositories/toevoegen",
    children: "Repository toevoegen",
  },
};

export const Subtle: Story = {
  args: {
    appearance: "subtle-button",
    href: "/apis/download",
    children: "Download alle API's",
  },
};
