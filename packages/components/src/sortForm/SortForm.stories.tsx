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
    const sortBySelect = canvas.getByLabelText("Sorteer op");
    const sortOrderSelect = canvas.getByLabelText("Volgorde");

    await expect(form).toHaveAttribute("action", "/apis");
    await expect(sortBySelect).toHaveValue("adrScore");
    await expect(sortOrderSelect).toHaveValue("desc");
    await expect(canvas.getByRole("button", { name: "Sorteer" })).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Sorteren" })).toHaveClass(
      "sr-only",
    );
    await expect(getComputedStyle(form as HTMLFormElement).justifyContent).toBe(
      "flex-end",
    );
    for (const select of [sortBySelect, sortOrderSelect]) {
      await expect(
        Number.parseFloat(getComputedStyle(select).paddingInlineEnd),
      ).toBeGreaterThanOrEqual(40);
    }
    await expect(
      form?.querySelectorAll('input[name="organisation"]'),
    ).toHaveLength(2);
  },
};
