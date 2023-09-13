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
  return cx(
    "group flex items-center gap-1 rounded px-3.5 py-2 text-sm font-medium hover:bg-gray-100 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50 dark:hover:bg-gray-800",
    props.intent === "primary" &&
      "bg-gray-800 font-semibold text-white hover:bg-gray-700 dark:bg-gray-300 dark:text-black dark:hover:bg-gray-200",
    props.intent === "secondary" && "bg-gray-100 dark:bg-gray-800",
    props.intent === "destructive" && "bg-red-600 text-white",
  );
};
