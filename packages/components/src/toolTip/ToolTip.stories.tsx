import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import AlignBox from "../alignBox/AlignBox";
import Block from "../block/Block";
import InfoButton from "../infoButton/InfoButton";
import ToolTip from "./ToolTip";

const waitForTimeout = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const meta = {
  title: "Components/ToolTip",
  component: ToolTip,
  tags: ["autodocs", "custom"],
  args: {
    text: "Nationale organisatie voor kadaster en vastgoedregistratie.",
    "aria-label": "Meer informatie over Kadaster",
  },
} satisfies Meta<typeof ToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const tooltip = canvas.getByText(args.text);
    expect(tooltip).not.toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: args["aria-label"] }),
    );

    await waitFor(() => expect(tooltip).toBeVisible());
  },
};

export const WithCustomTrigger: Story = {
  name: "Met eigen trigger-element",
  render: (args) => (
    <ToolTip {...args} id="tooltip-custom-trigger">
      {/* With a custom trigger, the popover wiring isn't done automatically
      and must be set on the trigger element to match the ToolTip's id. */}
      <InfoButton
        aria-label={args["aria-label"]}
        iconSize="large"
        command="toggle-popover"
        commandfor="tooltip-custom-trigger"
        interestfor="tooltip-custom-trigger"
      />
    </ToolTip>
  ),
  play: async ({ canvas, args, userEvent }) => {
    const tooltip = canvas.getByText(args.text);
    expect(tooltip).not.toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", { name: args["aria-label"] }),
    );

    await waitFor(() => expect(tooltip).toBeVisible());
  },
};

export const CommandForVsInterestFor: Story = {
  name: "commandfor vs. interestfor",
  decorators: [
    (Story) => (
      <Block layout="flex-row">
        <Story />
      </Block>
    ),
  ],
  render: (args) => (
    <>
      <AlignBox gap="medium">
        <p>Klik om te openen (commandfor)</p>
        <ToolTip text={args.text} id="tooltip-commandfor">
          <InfoButton
            aria-label="Meer informatie (klik om te openen)"
            command="toggle-popover"
            commandfor="tooltip-commandfor"
          />
        </ToolTip>
      </AlignBox>
      <AlignBox gap="medium">
        <p>Hover om te openen (interestfor)</p>
        {/* interestfor targets a "hint" popover, which opens on hover/focus
        instead of on click, unlike the "manual" popover used by commandfor. */}
        <ToolTip text={args.text} id="tooltip-interestfor" popover="hint">
          <InfoButton
            aria-label="Meer informatie (hover om te openen)"
            interestfor="tooltip-interestfor"
          />
        </ToolTip>
      </AlignBox>
    </>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const clickTooltip = canvasElement.querySelector("#tooltip-commandfor");
    const hoverTrigger = canvas.getByRole("button", {
      name: "Meer informatie (hover om te openen)",
    });
    expect(clickTooltip).not.toBeVisible();

    await userEvent.click(
      canvas.getByRole("button", {
        name: "Meer informatie (klik om te openen)",
      }),
    );
    await waitFor(() => expect(clickTooltip).toBeVisible());

    expect(hoverTrigger).toHaveAttribute("interestfor", "tooltip-interestfor");
    await userEvent.hover(hoverTrigger);

    // Interest Invokers defines a show delay before the interest state
    // activates, so give it a moment beyond hover before checking. Even with
    // this wait, `:interest-source` never matches in the test browser: the
    // browser recognizes the pseudo-class (matches() doesn't throw), but
    // actually activating it requires an experimental flag that isn't
    // guaranteed to be enabled here, so that part isn't asserted.
    await waitForTimeout(1000);
    expect(() => hoverTrigger.matches(":interest-source")).not.toThrow();
  },
};
