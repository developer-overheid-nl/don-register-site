import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "./Header";

/**
 * Header toont de sitekop met logo en sitetitel. Het link-gedrag van het
 * logo (`logoLinkBehaviour`) bepaalt of het terugverwijst naar de hoofdsite,
 * de homepage van deze site, of helemaal geen link is, en houdt daarbij
 * rekening met of de bezoeker al op de homepage is.
 */
const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs", "custom"],
  argTypes: {
    logoLinkBehaviour: {
      control: "select",
      options: ["site-home", "main-site", "main-site-on-home", "no-link"],
    },
  },
  args: {
    titleSite: "API-register",
    titlePage: "Overzicht",
    mainSite: {
      name: "developer.overheid.nl",
      url: "https://developer.overheid.nl",
    },
    urlHomepage: ["/", "/apis/pagina/[...page]"],
    urlCurrent: "/apis/toevoegen",
    logoLinkBehaviour: "main-site-on-home",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnHomepage: Story = {
  args: {
    urlCurrent: "/",
  },
};

export const AlwaysLinkToMainSite: Story = {
  args: {
    logoLinkBehaviour: "main-site",
  },
};

export const NoLogoLink: Story = {
  args: {
    logoLinkBehaviour: "no-link",
  },
};
