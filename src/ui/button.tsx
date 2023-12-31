import { tv } from "tailwind-variants";

export const button = tv(
  {
    base: "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold text-card-foreground transition-colors first-letter:capitalize focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-border active:opacity-80 disabled:pointer-events-none disabled:opacity-50 pointer-events-auto",
    variants: {
      intent: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline:
          "bg-transparent ring-1 ring-inset ring-border hover:bg-muted/50 hover:ring-ring",
        ghost: "bg-transparent hover:bg-muted/50",
        link: "!p-0 text-inherit font-medium underline decoration-1 underline-offset-2 hover:decoration-primary hover:underline-offset-4",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-2.5 text-xs",
        base: "h-9 px-4 text-sm",
        lg: "h-11 rounded-lg px-5 text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0",
        "icon-xs": "h-5 w-5 p-0",
      },
    },
    defaultVariants: { size: "base" },
  },
  {
    responsiveVariants: ["sm", "md", "lg"],
  },
);
