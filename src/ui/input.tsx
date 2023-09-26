import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

type Props = JSX.HtmlInputTag &
  JSX.HtmlSelectTag & {
    options?: { id: number; name: string }[];
    values?: number[];
    valueIsJson?: true;
    rt?: boolean;
    rb?: boolean;
  };
export function Input({ options, ...props }: Props) {
  return (
    <div
      class={cx(
        "group relative -my-px flex flex-col-reverse bg-background px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-border focus-within:z-10 focus-within:ring-2 focus-within:ring-primary",
        props.rt && "rounded-t-lg",
        props.rb && "rounded-b-lg",
        props.class,
      )}
    >
      {options ? (
        <select
          id={props.name}
          {...props}
          class="peer block w-full border-0 bg-transparent p-0 text-sm placeholder:font-light placeholder:text-foreground/50 focus:ring-0 sm:leading-loose"
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
                props.values && props.values.includes(id) ? "true" : undefined
              }
            >
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={props.name}
          {...props}
          class={cx(
            "peer block w-full border-0 bg-transparent p-0 text-sm text-foreground placeholder:font-light placeholder:text-muted-foreground focus:ring-0 sm:leading-loose",
            props.type == "checkbox" &&
              "absolute left-3 top-2.5 w-4 rounded border checked:bg-primary hover:checked:bg-primary focus:ring-2 focus:ring-primary focus:checked:bg-primary",
          )}
          safe
        />
      )}
      <label
        for={props.name}
        class={cx(
          "z-20 block select-none text-xs font-medium text-muted-foreground first-letter:capitalize after:ml-0.5 group-focus-within:text-primary peer-placeholder-shown:!text-inherit peer-required:after:content-['*'] peer-invalid:text-destructive",
          props.type == "checkbox" && "mb-1 ml-6 mt-px",
        )}
      >
        {dict.get(props.name)}
        <span class="float-right -mt-0.5 text-[0.6rem] text-muted">
          {options &&
            props.multiple &&
            "Shift o Ctrl para seleccionar multiples"}
          {props.title}
        </span>
      </label>
    </div>
  );
}
