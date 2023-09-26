import { cx } from "@/utils/cx";

export interface ButtonProps extends JSX.HtmlButtonTag {
  intent?: "primary" | "secondary" | "ghost" | "destructive" | "link";
  size?: "xs" | "sm" | "lg" | "icon";
  children?: any;
}
export const Button = ({ intent, size, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      class={buttonStyles({ intent, size, class: props.class })}
    >
      {children}
    </button>
  );
};

export const buttonStyles = (props: ButtonProps) => {
  return cx(
    "text-md group inline-flex h-9 items-center justify-center gap-2.5 whitespace-nowrap rounded-md px-4 py-2 font-medium transition-colors first-letter:capitalize focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    props.intent === "primary" &&
      "bg-primary font-semibold text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-offset-1",
    props.intent === "secondary" &&
      "bg-accent text-accent-foreground shadow-sm hover:bg-muted",
    props.intent === "ghost" &&
      "bg-background text-accent-foreground hover:bg-accent",
    props.intent === "destructive" &&
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    props.intent === "link" &&
      "px-0 text-primary underline-offset-4 hover:underline",
    props.size === "lg" && "h-10 rounded-md px-8",
    props.size === "sm" && "h-8 rounded-md px-3.5 text-sm",
    props.size === "xs" && "h-6 rounded-md px-2.5 text-xs",
    props.size === "icon" && "h-9 w-9 p-0",
    props.class,
  );
};
