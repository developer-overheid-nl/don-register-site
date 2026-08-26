import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import SortForm from "./SortForm";

/**
 * SortForm is een native GET-formulier met afzonderlijke keuzes voor het
 * sorteerveld en de sorteervolgorde. Actieve zoek- en filterparameters kunnen
 * als verborgen velden behouden blijven.
 */
const meta = {
  title: "Components/SortForm",
  component: SortForm,
  tags: ["autodocs", "custom"],
  args: {
    action: "/apis",
    options: [
      { value: "title", label: "Titel" },
      { value: "adrScore", label: "ADR-score" },
      { value: "version", label: "Versie" },
    ],
  },
} satisfies Meta<typeof SortForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Sorteer op")).toHaveValue("title");
    await expect(canvas.getByLabelText("Volgorde")).toHaveValue("asc");
  },
};

export const WithActiveSortAndFilters: Story = {
  name: "Met actieve sortering en filters",
  args: {
    sortBy: "adrScore",
    sortOrder: "desc",
    hiddenFields: [
      ["organisation", "https://example.nl/a"],
      ["organisation", "https://example.nl/b"],
      ["q", "adressen"],
    ],
  },
  play: async ({ canvas, canvasElement }) => {
    const form = canvasElement.querySelector("form");

    await expect(form).toHaveAttribute("action", "/apis");
    await expect(canvas.getByLabelText("Sorteer op")).toHaveValue("adrScore");
    await expect(canvas.getByLabelText("Volgorde")).toHaveValue("desc");
    await expect(canvas.getByRole("button", { name: "Sorteer" })).toBeVisible();
    await expect(
      form?.querySelectorAll('input[name="organisation"]'),
    ).toHaveLength(2);
  },
};
