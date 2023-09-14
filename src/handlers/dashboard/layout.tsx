import { Layout } from "@/components/layout";
import { Role } from "@/db/schema/user";
import { cx } from "@/utils/cx";

type Navigation = {
  name: string;
  href: string;
  icon: string;
  clearance: Role[];
};
const dashboardNavigation: Navigation[] = [
  {
    name: "Profile",
    href: "/dashboard",
    icon: "i-lucide-fingerprint",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Business",
    href: "/dashboard/business",
    icon: "i-lucide-box",
    clearance: ["owner", "admin"],
  },
  {
    name: "Tags",
    href: "/dashboard/tag",
    icon: "i-lucide-tag",
    clearance: ["admin"],
  },
];

export const DashboardLayout = ({
  role,
  current,
  children,
}: {
  role: Role;
  current: string;
  children?: any;
}) => (
  <Layout title="Dashboard" isAuth>
    <div class="mx-auto max-w-7xl lg:flex lg:gap-x-16">
      <aside className="flex h-fit overflow-x-auto border-b bg-white py-4 dark:border-gray-700 dark:bg-gray-900 lg:sticky lg:top-0 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-16">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul
            role="list"
            className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
          >
            {dashboardNavigation
              .filter((link) => link.clearance?.includes(role))
              .map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cx(
                      "group flex items-center gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6",
                      item.href === current
                        ? "pointer-events-none bg-gray-50 dark:bg-gray-850"
                        : "text-gray-700 hover:bg-gray-50 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-gray-850",
                    )}
                  >
                    <i
                      className={cx(
                        item.icon,
                        "h-5 w-5",
                        item.href === current
                          ? "text-cyan-600"
                          : "text-gray-400 group-hover:text-cyan-600",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </aside>

      <main className="px-4 py-12 sm:px-6 lg:flex-auto lg:px-0">
        {children}
      </main>
    </div>
  </Layout>
);
