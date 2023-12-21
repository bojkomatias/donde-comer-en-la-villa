import { tv } from "tailwind-variants";

export const table = tv({
  slots: {
    wrapper: "relative flow-root min-h-[50svh] pb-20",
    base: "min-w-full table-fixed",
    head: "relative after:absolute after:inset-x-px after:inset-y-1 after:-z-10 after:rounded-lg after:bg-card after:ring-1 after:ring-border",
    body: "divide-y divide-border",
    foot: "relative after:absolute after:inset-x-px after:inset-y-1 after:-z-10 after:rounded-lg after:bg-card after:ring-1 after:ring-border",
    tr: "w-full",
    th: "table-cell px-3 py-3 text-left text-xs font-semibold last:text-right sm:first:pl-6 sm:last:pr-6",
    td: "table-cell whitespace-nowrap px-3 py-3 text-sm text-foreground/70 first-of-type:pl-6 first-of-type:font-medium first-of-type:text-foreground last-of-type:text-right",
  },
});
