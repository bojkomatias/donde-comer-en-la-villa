export const Badge = ({ children }: { children: any }) => {
  return (
    <span class="inline-flex items-center rounded-md bg-amber-50/50 px-2 py-1 text-[0.6rem] font-medium capitalize text-amber-600 ring-1 ring-inset ring-gray-400/20 dark:bg-amber-950/20">
      {children}
    </span>
  );
};
