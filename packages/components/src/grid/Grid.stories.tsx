import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid from "./Grid";

/**
 * Grid is een hulpcomponent voor een responsieve CSS-grid: kolommen vullen
 * automatisch aan op basis van `minColumnWidth`, met een gap-schaal
 * (`none`, `small`, `medium`, `large`).
 *
 * Wordt op dit moment alleen gebruikt in Storybook, nog niet in de
 * registersites zelf.
 */
const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs", "code-only", "beta"],
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "small", "medium", "large"],
    },
  },
  args: {
    minColumnWidth: "6rem",
    gap: "medium",
    children: Array.from({ length: 42 }, (_, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
      <div key={index} style={{ background: "#e0e0e0", padding: "1rem" }}>
        Item {index + 1}
      </div>
    )),
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
