import { cx } from "../../utils/cx";

const commonClass = "h-6 w-6 rounded-full active:scale-95";

export function SunIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      class={cx(commonClass, props.class)}
    >
      <g fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zM4.293 4.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1-1.414 1.414l-1-1a1 1 0 0 1 0-1.414zm14 0a1 1 0 1 1 1.414 1.414l-1 1a1 1 0 1 1-1.414-1.414l1-1zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0zm-5 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM6.707 17.293a1 1 0 0 1 0 1.414l-1 1a1 1 0 0 1-1.414-1.414l1-1a1 1 0 0 1 1.414 0zm10.586 0a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1-1.414 1.414l-1-1a1 1 0 0 1 0-1.414zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"></path>
      </g>
    </svg>
  );
}

export function MoonIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      class={cx(commonClass, props.class)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"
      ></path>
    </svg>
  );
}

export function ChevronLeft(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      class={cx(commonClass, props.class)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m14 7l-5 5l5 5"
      ></path>
    </svg>
  );
}
