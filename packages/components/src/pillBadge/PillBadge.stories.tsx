import type { Meta, StoryObj } from "@storybook/react-vite";
import Block from "../block/Block";
import PillBadge from "./PillBadge";

const meta = {
  title: "Components/PillBadge",
  component: PillBadge,
  tags: ["autodocs"],
  // args: {
  //   type: 'color',
  // },
  argTypes: {
    startValue: {
      control: "text",
    },
    endValue: {
      control: "text",
    },
    color: {
      control: { type: "select" },
      table: {
        defaultValue: {
          detail:
            "deze kleur is niet los te kiezen, werkt goed met percentages",
        },
      },
      options: [
        "robijnrood",
        "roze",
        "rood",
        "oranje",
        "donkergeel",
        "geel",
        "donkergroen",
        "groen",
        "mosgroen",
        "mintgroen",
        "donkerblauw",
        "hemelblauw",
        "paars",
        "violet",
        "lichtblauw",
        "coolgrey",
        "grijs",
        "grey",
      ],
    },
  },
  decorators: [
    (Story) => (
      <Block layout="flex-col">
        <Story />
      </Block>
    ),
  ],
  parameters: {
    a11y: {
      config: {
        checks: [
          {
            id: "color-contrast",
            options: {
              ignorePseudo: true,
            },
          },
        ],
      },
    },
  },
} satisfies Meta<typeof PillBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const colorExamples = [
  {
    startValue: "Kleur",
    endValue: "robijnrood",
    type: "color" as const,
    color: "robijnrood",
  },
  {
    startValue: "Kleur",
    endValue: "roze",
    type: "color" as const,
    color: "roze",
  },
  {
    startValue: "Kleur",
    endValue: "rood",
    type: "color" as const,
    color: "rood",
  },
  {
    startValue: "Kleur",
    endValue: "oranje",
    type: "color" as const,
    color: "oranje",
  },
  {
    startValue: "Kleur",
    endValue: "donkergeel",
    type: "color" as const,
    color: "donkergeel",
  },
  {
    startValue: "Kleur",
    endValue: "geel",
    type: "color" as const,
    color: "geel",
  },
  {
    startValue: "Kleur",
    endValue: "donkergroen",
    type: "color" as const,
    color: "donkergroen",
  },
  {
    startValue: "Kleur",
    endValue: "groen",
    type: "color" as const,
    color: "groen",
  },
  {
    startValue: "Kleur",
    endValue: "mosgroen",
    type: "color" as const,
    color: "mosgroen",
  },
  {
    startValue: "Kleur",
    endValue: "mintgroen",
    type: "color" as const,
    color: "mintgroen",
  },
  {
    startValue: "Kleur",
    endValue: "donkerblauw",
    type: "color" as const,
    color: "donkerblauw",
  },
  {
    startValue: "Kleur",
    endValue: "hemelblauw",
    type: "color" as const,
    color: "hemelblauw",
  },
  {
    startValue: "Kleur",
    endValue: "paars",
    type: "color" as const,
    color: "paars",
  },
  {
    startValue: "Kleur",
    endValue: "violet",
    type: "color" as const,
    color: "violet",
  },
  {
    startValue: "Kleur",
    endValue: "lichtblauw",
    type: "color" as const,
    color: "lichtblauw",
  },
  {
    startValue: "Kleur",
    endValue: "coolgrey",
    type: "color" as const,
    color: "coolgrey",
  },
];

const percentageExamples = [
  { startValue: "Percentage", endValue: "76", type: "percentage" as const },
  {
    startValue: "Percentage & Kleur",
    endValue: "42",
    type: "percentage" as const,
    color: "robijnrood",
  },
  {
    startValue: "Percentage & Kleur",
    endValue: "21",
    type: "percentage" as const,
    color: "rood",
  },
];

export const Default: Story = {
  args: {
    startValue: "startValue",
    endValue: "endValue",
  },
};

export const ColorExamples: Story = {
  args: {
    startValue: "",
    endValue: "",
  },
  render: () => (
    <>
      {colorExamples.map((example) => (
        <PillBadge
          key={`${example.startValue}-${example.endValue}`}
          {...example}
        />
      ))}
    </>
  ),
};

export const PercentageExamples: Story = {
  args: {
    startValue: "",
    endValue: "",
  },
  render: () => (
    <>
      {percentageExamples.map((example) => (
        <PillBadge
          key={`${example.startValue}-${example.endValue}`}
          {...example}
        />
      ))}
    </>
  ),
};

export const AllExamples: Story = {
  args: {
    startValue: "",
    endValue: "",
  },
  render: () => (
    <>
      {colorExamples.map((example) => (
        <PillBadge
          key={`color-${example.startValue}-${example.endValue}`}
          {...example}
        />
      ))}
      {percentageExamples.map((example) => (
        <PillBadge
          key={`percentage-${example.startValue}-${example.endValue}`}
          {...example}
        />
      ))}
    </>
  ),
};
