import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import CopyButton from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs", "beta", "custom"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "This text will be copied!",
  },
  play: async ({ canvas, userEvent, args }) => {
    const cpButton = canvas.getByTitle("Kopieer naar klembord");

    const writeTextMock = fn();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    await userEvent.click(cpButton);

    await expect(writeTextMock).toHaveBeenCalledWith(args.text);

    writeTextMock.mockRestore();
  },
};
