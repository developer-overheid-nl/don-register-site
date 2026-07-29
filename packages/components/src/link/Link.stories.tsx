import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "../iconsSprite/Icon";
import Link from "./Link";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs", "re-export"],
  args: {
    href: "https://developer.overheid.nl",
    children: "developer.overheid.nl",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensInNewTab: Story = {
  name: "Opent in nieuw tabblad",
  args: {
    target: "_blank",
    rel: "noopener noreferrer",
    children: (
      <>
        developer.overheid.nl
        <Icon name="externe-link-inline" aria-label="Externe link naar" />
      </>
    ),
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const Current: Story = {
  name: "Huidige pagina",
  args: {
    current: "page",
  },
};
