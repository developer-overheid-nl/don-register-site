import type { Meta, StoryObj } from "@storybook/react-vite";
import ScoreBadge from "./ScoreBadge";

/**
 * ScoreBadge toont een score als een cirkelvormige meter, optioneel met het
 * maximum en/of als percentage.
 *
 * Verouderd: niet meer in gebruik.
 */
const meta = {
  title: "Components/ScoreBadge",
  component: ScoreBadge,
  tags: ["autodocs", "deprecated", "custom"],
  args: {
    name: "score",
    ariaLabelPrefix: "Score: ",
    score: 7,
    max: 10,
  },
} satisfies Meta<typeof ScoreBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMaxShown: Story = {
  args: {
    showMax: true,
  },
};

export const Percentage: Story = {
  args: {
    score: 82,
    max: 100,
    inPercentage: true,
  },
};

export const Empty: Story = {
  args: {
    score: null,
  },
};
