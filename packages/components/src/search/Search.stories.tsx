import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Search from "./Search";

const meta = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  args: {
    searchUrl: "/apis",
    searchKey: "q",
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSearchTerm: Story = {
  args: {
    searchTerm: "adressen",
  },
};

export const WithHiddenFields: Story = {
  name: "Met verborgen velden (actieve filters)",
  args: {
    hiddenFields: [
      ["organisation", "kadaster"],
      ["lifecycle", "active"],
    ],
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const form = canvasElement.querySelector("form");
    // Prevent the native GET submit from navigating away during the test.
    form?.addEventListener("submit", (event) => event.preventDefault());

    await expect(form?.querySelector('input[name="organisation"]')).toHaveValue(
      "kadaster",
    );
    await expect(form?.querySelector('input[name="lifecycle"]')).toHaveValue(
      "active",
    );

    const searchInput = canvas.getByLabelText("Voer een zoekterm in");
    await userEvent.type(searchInput, "kadaster");
    await expect(searchInput).toHaveValue("kadaster");

    await userEvent.click(canvas.getByRole("button", { name: "Zoek" }));
  },
};
