export function Input(props: JSX.HtmlInputTag) {
  return (
    <div class="relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 first:rounded-t last:rounded-b focus-within:z-10 focus-within:ring-2 group focus-within:ring-cyan-600 flex flex-col-reverse">
      <input
        {...props}
        class="peer block w-full border-0 p-0 placeholder:text-gray-400/50 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
      />
      <label
        htmlFor={props.name}
        class="block text-xs font-medium text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-600 first-letter:capitalize peer-placeholder-shown:text-inherit peer-invalid:text-red-600/80"
      >
        {props.name}
      </label>
     
    </div>
  );
}
