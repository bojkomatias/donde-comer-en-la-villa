import { cx } from "@/utils/cx";
import { Button, ButtonProps, buttonStyles } from "./button";

type Props = JSX.HtmlTag;

const Dropdown = (props: Props) => (
  <div {...props} class={cx("relative inline-block text-left", props.class)}>
    {props.children}
  </div>
);

Dropdown.Trigger = (props: ButtonProps) => (
  <Button
    {...props}
    _="on click halt bubbling
    on click send toggle to next .dropdown end"
  >
    {props.children}
  </Button>
);

Dropdown.Content = ({
  position = "top-right",
  ...props
}: Props & {
  position?: "top-left" | "top-right";
}) => (
  <div
    {...props}
    class={cx(
      "dropdown absolute z-10 hidden w-64 rounded-xl bg-card p-2 shadow ring-1 ring-border",
      "-translate-y-1 scale-95 opacity-0 transition ease-in",
      position === "top-left" && "mt-2 origin-top-left",
      position === "top-right" && "right-0 mt-2 origin-top-right",
      props.class,
    )}
    _="on click halt bubbling end
    on toggle if @class contains 'hidden' send open to me else send close to me end
    on open remove .hidden wait then remove .opacity-0 .scale-95 .-translate-y-1 end
    on close add .opacity-0 .scale-95 .-translate-y-1 settle then add .hidden end
    on closeImmediately add .hidden .opacity-0 .scale-95 .-translate-y-1 to me end"
  >
    {props.children}
  </div>
);

Dropdown.Header = (props: Props) => (
  <div {...props} class={cx("px-3 py-2", props.class)}>
    {props.children}
  </div>
);

Dropdown.Item = ({
  as: Component = "button",
  ...props
}: ButtonProps & { as?: "button" | "a"; href?: string }) => (
  <Component
    {...props}
    class={buttonStyles({
      class: cx(
        "w-full items-center justify-between px-4 font-normal text-accent-foreground hover:bg-muted hover:text-foreground",
        props.class,
      ),
      intent: props.intent,
      size: props.size,
    })}
    _="on click send closeImmediately to closest .dropdown"
  >
    {props.children}
  </Component>
);

Dropdown.Separator = () => <div class="my-1 h-0 border-t border-border" />;

export default Dropdown;
