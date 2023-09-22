export const Badge = ({ children }: { children: any }) => {
  return (
    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[0.6rem] font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-900">
      {children}
    </span>
  );
};
