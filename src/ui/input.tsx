import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

type Props = JSX.HtmlInputTag &
  JSX.HtmlSelectTag & {
    options?: { id: number; name: string }[];
    values?: number[];
    valueIsJson?: true;
    rt?: boolean;
    rb?: boolean;
    label?: string;
    inputClass?: string;
    labelClass?: string;
  };
export function Input({ options, ...props }: Props) {
  return (
    <div
      class={cx(
        "group relative -my-px flex flex-col-reverse bg-background px-3 pb-1 pt-2 ring-1 ring-inset ring-border focus-within:z-10 focus-within:ring-2 focus-within:ring-primary",
        props.rt && "rounded-t-lg",
        props.rb && "rounded-b-lg",
        props.class,
        props.type == "file" && "transition duration-300 hover:bg-yellow-50",
      )}
    >
      {options ? (
        <select
          id={props.name}
          {...props}
          class="peer block w-full border-0 bg-transparent p-0 text-sm placeholder:font-light placeholder:text-foreground/50 focus:ring-0"
        >
          {options.map(({ id, name }) => (
            <option
              value={
                props.valueIsJson
                  ? `{ "id": ${id}, "name": "${name}" }`
                  : id.toString()
              }
              class="capitalize"
              // Default select previous values on edit
              selected={
                props.values && props.values.includes(id) ? true : undefined
              }
            >
              {name}
            </option>
          ))}
        </select>
      ) : (
        <>
          <input
            id={props.name}
            {...props}
            class={cx(
              "peer block w-full border-0 bg-transparent p-0 text-sm text-foreground placeholder:font-light placeholder:text-muted-foreground focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:leading-loose",
              props.type == "checkbox" &&
                "absolute left-3 top-2.5 mt-px h-3.5 w-3.5 rounded-sm border border-border text-foreground focus:ring-2 focus:ring-border focus:ring-offset-background dark:text-muted",
              props.type == "file" && "hidden",
              props.inputClass,
            )}
            safe
          />
        </>
      )}
      {props.type == "file" && (
        <>
          <div id="imageName" class="-mt-1 hidden text-sm italic"></div>
          <img
            onclick="document.getElementById('image').click()"
            id="imageContainer"
            class="mb-2 hidden max-w-[10rem]  cursor-pointer"
          ></img>
        </>
      )}
      <label
        for={props.name}
        class={cx(
          "z-20 block cursor-pointer select-none text-xs font-medium text-muted-foreground first-letter:capitalize after:ml-0.5 group-focus-within:text-primary peer-placeholder-shown:!text-inherit peer-required:after:content-['*'] peer-invalid:text-destructive",
          props.type == "checkbox" && "mb-1 ml-6 mt-px",
          props.labelClass,
          props.type == "file" && "-mt-1 mb-0 cursor-pointer pb-2 pt-1",
        )}
      >
        {props.label ?? dict.get(props.name)}
        <span class="float-right -mt-0.5 text-[0.6rem] text-muted-foreground">
          {options &&
            props.multiple &&
            "Shift o Ctrl para seleccionar múltiples"}
          {props.title}
        </span>
      </label>
    </div>
  );
}
