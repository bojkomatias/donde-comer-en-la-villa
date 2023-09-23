export const Badge = ({ children }: { children: any }) => {
  return (
    <span class="inline-flex items-center rounded bg-white px-2 py-1 text-[0.65rem] font-medium capitalize text-gray-600 ring-1 ring-inset ring-gray-400/20 dark:bg-gray-950 dark:text-gray-300">
      {children}
    </span>
  );
};
