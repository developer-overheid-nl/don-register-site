import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import SortForm from "./SortForm";

/**
 * SortForm is een native GET-formulier met één gecombineerde keuze voor het
 * sorteerveld en de sorteervolgorde. De keuze wordt direct toegepast. Actieve
 * zoek- en filterparameters kunnen als verborgen velden behouden blijven.
 */
const meta = {
  title: "Components/SortForm",
  component: SortForm,
  tags: ["autodocs", "custom"],
  args: {
    action: "/apis",
    options: [
      { sortBy: "title", sortOrder: "asc", label: "Titel A–Z" },
      { sortBy: "title", sortOrder: "desc", label: "Titel Z–A" },
      {
        sortBy: "adrScore",
        sortOrder: "asc",
        label: "ADR-score laag–hoog",
      },
      {
        sortBy: "adrScore",
        sortOrder: "desc",
        label: "ADR-score hoog–laag",
      },
      { sortBy: "version", sortOrder: "asc", label: "Versie laag–hoog" },
      { sortBy: "version", sortOrder: "desc", label: "Versie hoog–laag" },
    ],
  },
} satisfies Meta<typeof SortForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Sorteer op")).toHaveValue("title:asc");
    await expect(canvas.queryByLabelText("Volgorde")).not.toBeInTheDocument();
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
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
    const sortSelect = canvas.getByLabelText("Sorteer op");
    const sortLabel = canvasElement.querySelector(
      `label[for="${sortSelect.id}"]`,
    );
    let submitCount = 0;

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      submitCount += 1;
    });

    await expect(form).toHaveAttribute("action", "/apis");
    await expect(sortSelect).toHaveValue("adrScore:desc");
    await expect(canvas.queryByLabelText("Volgorde")).not.toBeInTheDocument();
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(canvas.getByRole("heading", { name: "Sorteren" })).toHaveClass(
      "sr-only",
    );
    await expect(getComputedStyle(form as HTMLFormElement).justifyContent).toBe(
      "flex-end",
    );
    await expect(
      Number.parseFloat(getComputedStyle(sortSelect).paddingInlineEnd),
    ).toBeGreaterThanOrEqual(40);
    await expect(sortLabel).not.toBeNull();
    const labelRect = (sortLabel as HTMLLabelElement).getBoundingClientRect();
    const selectRect = sortSelect.getBoundingClientRect();
    await expect(
      Math.abs(
        labelRect.top +
          labelRect.height / 2 -
          (selectRect.top + selectRect.height / 2),
      ),
    ).toBeLessThanOrEqual(1);
    await expect(labelRect.right).toBeLessThanOrEqual(selectRect.left);
    await expect(
      getComputedStyle(sortLabel as HTMLLabelElement).whiteSpace,
    ).toBe("nowrap");
    await expect(
      form?.querySelectorAll('input[name="organisation"]'),
    ).toHaveLength(2);

    await userEvent.selectOptions(sortSelect, "version:desc");

    await expect(form?.querySelector('input[name="sortBy"]')).toHaveValue(
      "version",
    );
    await expect(form?.querySelector('input[name="sortOrder"]')).toHaveValue(
      "desc",
    );
    await expect(submitCount).toBe(1);
  },
};
