import { cx } from "@/utils/cx";

type Props = { class?: string; children: any };

const Card = (props: Props) => (
  <div
    class={cx(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      props.class || "w-80",
    )}
  >
    {props.children}
  </div>
);

Card.Header = (props: Props) => (
  <div class={cx("flex flex-col space-y-1.5 p-6", props.class)}>
    {props.children}
  </div>
);

Card.Title = (props: Props) => (
  <h2 class={cx("font-semibold leading-none tracking-tight", props.class)}>
    {props.children}
  </h2>
);

Card.Description = (props: Props) => (
  <p class={cx("text-sm text-muted-foreground", props.class)}>
    {props.children}
  </p>
);

Card.Content = (props: Props) => (
  <div class={cx("p-6 pt-0", props.class)}>{props.children}</div>
);

Card.Footer = (props: Props) => (
  <div class={cx("flex items-center p-6 pt-0", props.class)}>
    {props.children}
  </div>
);

export default Card;
