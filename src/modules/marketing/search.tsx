export const Search = () => {
  return (
    <div class="relative mx-4 flex h-10 items-center lg:mr-0">
      <input
        hx-post="/search"
        hx-trigger="keyup changed delay:500ms, search"
        hx-target="#results"
        hx-swap="outerHTML"
        id="search"
        type="text"
        name="search"
        placeholder="Local, comida, etc."
        class="block h-full w-full rounded border-0 bg-gray-50 py-1.5 pl-10 pr-14 ring-1 ring-inset ring-gray-500/5 placeholder:font-thin placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-cyan-600 dark:bg-gray-900/50 sm:text-sm sm:leading-6"
      />
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center py-1.5 pl-2">
        <i class="i-lucide-search text-gray-500" />
      </div>
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-2">
        <kbd class="my-0.5 inline-flex items-center rounded border bg-white px-1.5 font-sans text-xs text-gray-500/70 dark:border-gray-800 dark:bg-gray-950">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};
