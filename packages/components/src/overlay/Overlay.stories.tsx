import type { Meta, StoryObj } from "@storybook/react-vite";
import Overlay from "./Overlay";

/**
 * Overlay dekt zijn omliggende content af zolang `active` waar is,
 * bijvoorbeeld tijdens het laden van een formulieractie. Vereist een
 * `position: relative` ouderelement.
 */
const meta = {
  title: "Components/Overlay",
  component: Overlay,
  tags: ["autodocs", "custom"],
  args: {
    active: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", maxWidth: "20rem" }}>
        <p>
          Deze inhoud wordt afgedekt terwijl er bijvoorbeeld op een
          formulieractie wordt gewacht.
        </p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
