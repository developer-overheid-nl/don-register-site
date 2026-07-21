import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs", "remixed"],
  args: {
    children: "Dit is een melding.",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["info", "ok", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoAlert: Story = {
  name: "Info",
  args: {
    type: "info",
  },
};

export const OkAlert: Story = {
  name: "Ok",
  args: {
    type: "ok",
    children: "De actie is succesvol uitgevoerd.",
  },
};

export const WarningAlert: Story = {
  name: "Warning",
  args: {
    type: "warning",
    children: "Let op: controleer de ingevoerde gegevens.",
  },
};

export const ErrorAlert: Story = {
  name: "Error",
  args: {
    type: "error",
    children: "Er is een fout opgetreden.",
  },
};
