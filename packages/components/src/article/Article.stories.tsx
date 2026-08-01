import type { Meta, StoryObj } from "@storybook/react-vite";
import Article from "./Article";

/**
 * Dit component is er om de breedte van de inhoud ervan te beperken tot de ideale lees-lengte.
 * Het rendert een HTML `<article>`-element.
 */
const meta = {
  title: "Components/Article",
  component: Article,
  tags: ["autodocs", "re-export"],
  args: {
    children: "Dit is de inhoud van het artikel.",
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongText: Story = {
  name: "Lange tekst (toont de leesbreedte)",
  args: {
    children: (
      <>
        <p>
          Het API-register is de centrale plek waar overheidsorganisaties hun
          API&apos;s registreren, zodat andere overheden, bedrijven en burgers
          eenvoudig kunnen ontdekken welke API&apos;s beschikbaar zijn. Door
          API&apos;s te registreren, wordt het makkelijker om hergebruik van
          gegevens en functionaliteit te stimuleren, in plaats van dat iedere
          organisatie het wiel opnieuw uitvindt.
        </p>
        <p>
          Elke registratie bevat onder andere de OAS-specificatie, contact- en
          beheerinformatie, de levensfase van de API (bijvoorbeeld actief,
          verouderd of uit gebruik genomen) en een verwijzing naar de
          organisatie die de API beheert. Hierdoor kunnen ontwikkelaars snel
          inschatten of een API geschikt is voor hun toepassing, zonder eerst
          contact te hoeven opnemen met de beherende organisatie.
        </p>
        <p>
          Dit component beperkt de breedte van zijn inhoud tot een ideale
          lees-lengte, ongeacht hoeveel tekst er wordt doorgegeven. Zo blijft
          een lange, doorlopende tekst goed leesbaar op elk schermformaat, in
          plaats van dat regels over de volledige breedte van een breed scherm
          uitrekken.
        </p>
      </>
    ),
  },
};
