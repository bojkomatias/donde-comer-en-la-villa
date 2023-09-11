export function Input(props: JSX.HtmlInputTag) {
  return (
    <div class="relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 first:rounded-t last:rounded-b focus-within:z-10 focus-within:ring-2 focus-within:ring-cyan-600">
      <label
        htmlFor={props.name}
        class="block text-xs font-medium text-gray-900 first-letter:capitalize"
      >
        {props.name}
      </label>
      <input
        {...props}
        class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
