import { cx } from "@/utils/cx";

type Props = JSX.HtmlInputTag &
  JSX.HtmlSelectTag & {
    options?: string[];
  };
export function Input({ options, ...props }: Props) {
  return (
    <div class="group relative -my-px flex flex-col-reverse bg-white px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 first-of-type:rounded-t last-of-type:rounded-b focus-within:z-10 focus-within:ring-2 focus-within:ring-cyan-600 dark:bg-gray-950 dark:ring-gray-600 dark:focus-within:ring-cyan-700">
      {options ? (
        <select
          id={props.name}
          {...props}
          class="peer block w-full border-0 bg-transparent p-0 text-sm placeholder:font-light placeholder:text-gray-500/50 focus:ring-0 sm:leading-loose"
        >
          {options.map((opt) => (
            <option>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          id={props.name}
          {...props}
          class={cx(
            "peer block w-full border-0 bg-transparent p-0 text-sm placeholder:font-light placeholder:text-gray-500/50 focus:ring-0 sm:leading-loose",
            props.type == "checkbox" &&
              "absolute left-3 top-2.5 w-4 rounded border checked:bg-cyan-600 hover:checked:bg-cyan-600 focus:ring-2 focus:ring-cyan-600 focus:checked:bg-cyan-600 dark:focus:ring-offset-gray-950",
          )}
        />
      )}
      <label
        for={props.name}
        class={cx(
          "z-20 block select-none text-xs font-medium text-gray-500 first-letter:capitalize after:ml-0.5 group-focus-within:text-cyan-600 peer-placeholder-shown:!text-inherit peer-required:after:content-['*'] peer-invalid:text-red-600 dark:group-focus-within:text-cyan-700",
          props.type == "checkbox" && "mb-1 ml-6 mt-px",
        )}
      >
        {props.label}
        <span class="float-right -mt-0.5 text-[0.6rem] text-gray-500">
          {options &&
            props.multiple &&
            "Shift + click para seleccionar multiples"}
          {props.title}
        </span>
      </label>
    </div>
  );
}
