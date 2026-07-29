import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs", "custom"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Middelste pagina (met ellipsis)",
  args: {
    links: [
      { href: "/apis/pagina/3", label: 3, current: false },
      { href: "/apis/pagina/4", label: 4, current: false },
      { href: "/apis/pagina/5", label: 5, current: true, range: [81, 100] },
      { href: "/apis/pagina/6", label: 6, current: false },
      { href: "/apis/pagina/7", label: 7, current: false },
    ],
    first: { href: "/apis/pagina/1", label: 1 },
    prev: { href: "/apis/pagina/4", label: 4 },
    ellipsisBefore: true,
    ellipsisAfter: true,
    next: { href: "/apis/pagina/6", label: 6 },
    last: { href: "/apis/pagina/10", label: 10 },
  },
};

export const FirstPage: Story = {
  name: "Eerste pagina",
  args: {
    links: [
      { href: "/apis/pagina/1", label: 1, current: true, range: [1, 20] },
      { href: "/apis/pagina/2", label: 2, current: false },
      { href: "/apis/pagina/3", label: 3, current: false },
    ],
    first: false,
    prev: false,
    ellipsisBefore: false,
    next: { href: "/apis/pagina/2", label: 2 },
    last: { href: "/apis/pagina/10", label: 10 },
    ellipsisAfter: true,
  },
};

export const LastPage: Story = {
  name: "Laatste pagina",
  args: {
    links: [
      { href: "/apis/pagina/8", label: 8, current: false },
      { href: "/apis/pagina/9", label: 9, current: false },
      {
        href: "/apis/pagina/10",
        label: 10,
        current: true,
        range: [181, 200],
      },
    ],
    first: { href: "/apis/pagina/1", label: 1 },
    prev: { href: "/apis/pagina/9", label: 9 },
    ellipsisBefore: true,
    next: false,
    last: false,
    ellipsisAfter: false,
  },
};

export const FewPages: Story = {
  name: "Weinig pagina's (geen ellipsis)",
  args: {
    links: [
      { href: "/apis/pagina/1", label: 1, current: false },
      { href: "/apis/pagina/2", label: 2, current: true, range: [21, 40] },
      { href: "/apis/pagina/3", label: 3, current: false },
    ],
    prev: { href: "/apis/pagina/1", label: 1 },
    next: { href: "/apis/pagina/3", label: 3 },
    first: false,
    last: false,
    ellipsisBefore: false,
    ellipsisAfter: false,
  },
};
