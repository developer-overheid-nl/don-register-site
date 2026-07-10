import type { Meta, StoryObj } from "@storybook/react-vite";
import AlignBox from "../alignBox/AlignBox";
import DataBadgeLink from "../dataBadgeLink/DataBadgeLink";
import HeadingGroup from "../headingGroup/HeadingGroup";
import Markdown from "../markdown/Markdown";
import Paragraph from "../paragraph/Paragraph";
import PillBadge from "../pillBadge/PillBadge";
import CardAsLink from "./CardAsLink";

const meta = {
  title: "Components/CardAsLink",
  component: CardAsLink,
  tags: ["autodocs"],
} satisfies Meta<typeof CardAsLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApiOverviewCard: Story = {
  args: {
    href: "/apis/basisregistratie-adressen-en-gebouwen",
    linkLabel: "Bekijk details",
  },
  render: (args) => (
    <CardAsLink {...args}>
      <HeadingGroup
        slot="heading"
        title="Basisregistratie Adressen en Gebouwen API"
        level={2}
        appearanceLevel={4}
      >
        <div className="subtitle" slot="subTitle">
          <Paragraph
            slot="subTitle"
            data-content-piece="Organisation Name"
            itemScope={true}
            itemType="https://schema.org/Organization"
            itemID="https://standaarden.overheid.nl/owms/terms/Kadaster"
            className="moveAbove"
          >
            <span itemProp="name">
              <DataBadgeLink
                appearance="subtle"
                href="/apis?organisation=kadaster"
              >
                Kadaster
              </DataBadgeLink>
            </span>
          </Paragraph>
          <div className="header-meta" />
        </div>
      </HeadingGroup>
      <div slot="description" className="description utrecht-html">
        <Markdown
          text="API voor het zoeken en raadplegen van adressen, panden, verblijfsobjecten en gerelateerde gegevens uit de BAG."
          openLinksInNewTab
          allowedElements={["p", "a", "ul", "ol", "li"]}
        />
      </div>
      <AlignBox align="space-between" slot="metadata" className="meta">
        <PillBadge
          startValue="Status"
          endValue="Actief"
          type="color"
          color="mintgroen"
        />
        <span className="last-updated">Laatste wijziging: 08-07-2026</span>
      </AlignBox>
    </CardAsLink>
  ),
};
