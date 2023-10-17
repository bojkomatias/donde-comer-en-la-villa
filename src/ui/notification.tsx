export const Notification = ({
  title,
  description,
  icon,
  isError,
}: {
  title: string;
  description: string;
  icon?: string;
  isError?: boolean;
}) => {
  return (
    <div
      id="notification"
      hx-swap-oob="true"
      class="animate-in slide-in-from-bottom fade-in fixed bottom-2 left-2 right-2 z-30 overflow-hidden rounded-lg bg-card shadow ring-1 ring-border duration-200 sm:bottom-8 sm:left-auto sm:right-4 sm:w-96"
      _="init end
      init wait 4s then send close to me end
      on close add .animate-out .slide-out-to-right .fade-out wait 0.19s hide me end"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i
              class={
                icon
                  ? icon
                  : isError
                  ? "i-lucide-x-circle h-6 w-6 text-red-600"
                  : "i-lucide-check-circle h-6 w-6 text-emerald-600"
              }
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium">{title}</p>
            <p class="mt-1 text-sm font-light text-gray-500">{description}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="inline-flex rounded-lg p-1 focus-within:outline-gray-500 hover:bg-gray-50 focus:outline focus:outline-gray-500 focus-visible:outline-offset-0 dark:hover:bg-gray-900"
              _="on click send close to #notification"
            >
              <span class="sr-only">Close</span>
              <i class="i-lucide-x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
