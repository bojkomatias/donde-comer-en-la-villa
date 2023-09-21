import { dashboardNav } from "@/config/dashboard";
import { Role } from "@/db/schema/user";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

export const DashboardLayout = ({
  role,
  current,
  children,
}: {
  role: Role;
  current: string;
  children?: any;
}) => (
  <div
    id="dashboard"
    class="lg:flex lg:gap-x-8"
    hx-target="this"
    hx-swap="outerHTML"
  >
    <aside class="absolute left-0 flex h-fit w-screen max-w-none overflow-x-auto border-b bg-white py-4 dark:border-gray-700 dark:bg-gray-950 lg:sticky lg:top-0 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-16">
      <nav class="container mx-auto flex-none px-4 sm:px-6 lg:px-2">
        <ul
          role="list"
          class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
        >
          {dashboardNav
            .filter((link) => link.clearance?.includes(role))
            .map((item) => (
              <li>
                <button
                  hx-get={item.href}
                  hx-push-url="true"
                  class={cx(
                    "group flex w-full items-center gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold capitalize leading-6",
                    item.href === current
                      ? "bg-gray-50 dark:bg-gray-900/50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-gray-900",
                  )}
                >
                  <i
                    class={cx(
                      item.icon,
                      "h-5 w-5",
                      item.href === current
                        ? "text-cyan-600"
                        : "text-gray-400 group-hover:text-cyan-600",
                    )}
                    aria-hidden="true"
                  />
                  {dict.get(item.name)}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </aside>

    <div class="pt-24 lg:flex-auto lg:pt-12">{children}</div>
  </div>
);
