import { cx } from "@/utils/cx";

export const Badge = ({
  children,
  intent,
}: {
  children: any;
  intent?: "primary" | "destructive";
}) => {
  return (
    <span
      class={cx(
        "inline-flex items-center whitespace-nowrap rounded-lg border-border px-2.5 text-xs font-semibold capitalize leading-relaxed transition-colors focus:outline-none",
        "bg-accent text-accent-foreground hover:bg-accent/80",
        intent === "primary" &&
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        intent === "destructive" &&
          "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      )}
    >
      {children}
    </span>
  );
};
