import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Icon from "../iconsSprite/Icon";
import LinkButton from "./LinkButton";

/**
 * LinkButton is een knop die eruitziet als een link. Gebruik deze voor acties
 * op de huidige pagina, zoals "Toon meer" bij de filters. Voor navigatie naar
 * een andere pagina gebruik je `Link`.
 *
 * ## Wijzigingen tov RHC:
 * - `appearance="small"`: geen padding boven en onder en een kleinere
 *   letter
 */
const meta = {
  title: "Components/LinkButton",
  component: LinkButton,
  tags: ["autodocs", "remixed"],
  args: {
    children: "Toon meer",
    onClick: fn(),
  },
  argTypes: {
    appearance: {
      control: "select",
      options: [undefined, "small"],
    },
    inline: { control: "boolean" },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    appearance: "small",
  },
};

export const WithIcon: Story = {
  name: "Met icoon",
  args: {
    appearance: "small",
    children: (
      <>
        Toon meer
        <Icon name="delta-naar-rechts-inline" aria-hidden />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
