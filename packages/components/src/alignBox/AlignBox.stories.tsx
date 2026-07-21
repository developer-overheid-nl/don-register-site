import type { Meta, StoryObj } from "@storybook/react-vite";
import AlignBox from "./AlignBox";

const meta = {
  title: "Components/AlignBox",
  component: AlignBox,
  tags: ["autodocs", "custom"],
  argTypes: {
    align: {
      control: "select",
      options: [
        "left",
        "center",
        "right",
        "top",
        "bottom",
        "middle",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "stretch",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    gap: {
      control: "select",
      options: ["none", "small", "medium", "large"],
    },
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    display: {
      control: "select",
      options: ["block", "inline"],
    },
  },
  args: {
    align: "center",
    gap: "medium",
    direction: "row",
    wrap: false,
    display: "block",
  },
  render: (args) => (
    <AlignBox {...args} style={{ border: "1px dashed #ccc", minHeight: 120 }}>
      <div style={{ background: "#e0e0e0", padding: "8px 16px" }}>Een</div>
      <div style={{ background: "#e0e0e0", padding: "8px 16px" }}>Twee</div>
      <div style={{ background: "#e0e0e0", padding: "8px 16px" }}>Drie</div>
    </AlignBox>
  ),
} satisfies Meta<typeof AlignBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SpaceBetween: Story = {
  args: {
    align: "space-between",
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    align: "stretch",
  },
};

export const Wrap: Story = {
  args: {
    wrap: true,
    gap: "small",
  },
};
