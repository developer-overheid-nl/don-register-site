import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import ButtonLink from "./ButtonLink";

/**
 * ButtonLink is een link die eruitziet als een button. Gebruik deze voor
 * navigatie naar een andere pagina die als duidelijke actie moet opvallen,
 * zoals "API toevoegen". Voor een actie op de huidige pagina gebruik je
 * `Button`, voor een knop die eruitziet als een link `LinkButton`.
 */
const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs", "re-export"],
  args: {
    children: "API toevoegen",
    href: "/apis/toevoegen",
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
    external: { control: "boolean" },
    placeholder: { control: "boolean" },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appearance: "primary-action-button",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "API toevoegen" }),
    ).toHaveAttribute("href", "/apis/toevoegen");
  },
};

export const Secondary: Story = {
  args: {
    appearance: "secondary-action-button",
    children: "Alle API's bekijken",
    href: "/apis",
  },
};

export const Subtle: Story = {
  args: {
    appearance: "subtle-button",
    children: "Download als CSV",
    href: "/apis/download",
  },
};

export const External: Story = {
  name: "Externe link",
  args: {
    appearance: "secondary-action-button",
    children: "Naar developer.overheid.nl",
    href: "https://developer.overheid.nl",
    external: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link")).toHaveAttribute(
      "rel",
      expect.stringContaining("external"),
    );
  },
};
