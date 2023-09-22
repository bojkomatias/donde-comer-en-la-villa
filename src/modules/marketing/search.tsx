export const Search = () => {
  return (
    <div class="relative mx-4 mt-2 flex items-center">
      <input
        id="search"
        type="text"
        name="search"
        placeholder="¿Que querés comer?"
        class="block w-full rounded-md border-0 ring-inset ring-1 ring-gray-500/5 bg-gray-50 py-1.5 pl-10 pr-14 placeholder:font-thin placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-cyan-600 dark:bg-gray-900/50 sm:text-sm sm:leading-6"
      />
      <div class="absolute inset-y-0 left-0 flex items-center justify-center py-1.5 pl-2">
        <i class="i-lucide-search text-gray-500" />
      </div>
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-2">
        <kbd class="inline-flex items-center rounded border bg-white px-1 font-sans text-xs text-gray-500/70 dark:border-gray-800 dark:bg-gray-950">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};
