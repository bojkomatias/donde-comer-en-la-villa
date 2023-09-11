import { cx } from "../../utils/cx";

interface Props extends JSX.HtmlButtonTag {
  intent?: "primary" | "secondary" | "outline" | "destructive";
  children?: any;
}
export const Button = ({ intent, loading, children, ...props }: Props) => {
  return (
    <button {...props} class={buttonStyles({ intent, class: props.class })}>
      {children}
    </button>
  );
};

export const buttonStyles = (props: {
  intent?: "primary" | "secondary" | "outline" | "destructive";
  class?: string;
}) => {
  const base =
    "text-sm px-4 py-2 rounded active:brightness-105 focus-visible:outline-offset-2";
  switch (props.intent) {
    case "primary":
      return cx(
        base,
        "font-bold bg-gray-900 hover:bg-gray-800 text-white",
        props.class,
      );

    default:
      return cx(
        base,
        "bg-gray-200 font-semibold text-gray-700 hover:bg-gray-300 hover:text-gray-700",
        props.class,
      );
  }
};
