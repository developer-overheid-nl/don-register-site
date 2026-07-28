import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from "./Footer";

const registersColumn = {
  title: "Registers",
  items: [
    {
      id: "add-apis",
      label: "API's toevoegen",
      href: "/apis/toevoegen",
    },
    {
      id: "add-repositories",
      label: "Repositories toevoegen",
      href: "https://oss.developer.overheid.nl/repositories/toevoegen",
    },
    {
      id: "statistics",
      label: "API-statistieken",
      href: "https://apis.developer.overheid.nl/api-statistieken",
    },
    {
      id: "api-archive",
      label: "Sitearchief API-register",
      href: "https://minbzk.sitearchief.nl/?subsite=devoverheidapis",
      icon: "_external",
    },
  ],
};

const communityColumn = {
  title: "Community",
  items: [
    {
      id: "slack",
      label: "Slack",
      href: "https://codefornl.slack.com/archives/CFV4B3XE2",
      icon: "_external",
    },
    {
      id: "github",
      label: "Github",
      href: "https://github.com/developer-overheid-nl",
      icon: "_external",
    },
    {
      id: "mastodon",
      label: "Mastodon",
      href: "https://social.overheid.nl/@developer",
      icon: "_external",
    },
  ],
};

const overigColumn = {
  title: "Overig",
  items: [
    {
      id: "bijdragen",
      label: "Bijdragen",
      href: "https://developer.overheid.nl/contributing",
    },
    {
      id: "contact",
      label: "Contact",
      href: "https://developer.overheid.nl/contact",
    },
    {
      id: "privacy",
      label: "Privacyverklaring",
      href: "https://developer.overheid.nl/privacy",
    },
    {
      id: "toegankelijkheid",
      label: "Toegankelijkheid",
      href: "https://developer.overheid.nl/toegankelijkheid",
    },
  ],
};

const sponsorsColumn = {
  title: "Mede mogelijk gemaakt door",
  text: "Ministerie van BZK, VNG en Forum Standaardisatie.",
};

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  args: {
    columns: [registersColumn, communityColumn, overigColumn],
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSponsorText: Story = {
  args: {
    columns: [sponsorsColumn, registersColumn, communityColumn, overigColumn],
  },
};

export const SingleColumn: Story = {
  args: {
    columns: [registersColumn],
  },
};

export const NoColumns: Story = {
  args: {
    columns: [],
  },
};
