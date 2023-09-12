import { Layout } from "../components/layout";
import { Button } from "../components/ui/button";
import { Role } from "../db/schema/user";
import { cx } from "../utils/cx";
import { Setup } from "./setup";

export const dashboardHandler = (app: Setup) =>
  app.group(
    "/dashboard",
    {
      beforeHandle: async ({ user, set }) => {
        if (!user) {
          set.status = 401;
          return (set.redirect = "/");
        }
      },
    },
    (app) =>
      app
        // Can use user!.role because it's already guarded
        .get("/", ({ user }) => {
          return (
            <DashboardLayout role={user!.role} current="/dashboard">
              <GeneralPage />
            </DashboardLayout>
          );
        })
        .get("/business", ({ user }) => (
          <DashboardLayout role={user!.role} current="/dashboard/business">
            <div class="space-y-3">
              <Button intent="primary">Primary</Button>
              <Button intent="secondary">Secondary</Button>
              <Button intent="destructive">Destructive</Button>
              <Button>Default</Button>
            </div>
          </DashboardLayout>
        )),
  );

type Navigation = {
  name: string;
  href: string;
  icon: any;
  clearance: Role[];
};
const dashboardNavigation: Navigation[] = [
  {
    name: "General",
    href: "/dashboard",
    icon: "user",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Business",
    href: "/dashboard/business",
    icon: "box",
    clearance: ["owner", "admin"],
  },
  {
    name: "Notifications",
    href: "#",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
    ),
    clearance: ["admin"],
  },
  {
    name: "Plan",
    href: "#",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    clearance: ["admin"],
  },
];

const DashboardLayout = ({
  role,
  current,
  children,
}: {
  role: Role;
  current: string;
  children?: any;
}) => (
  <Layout title="Dashboard" isAuth>
    <div class="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">
      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
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
                      item.href === current
                        ? "pointer-events-none bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6",
                    )}
                  >
                    <i
                      data-lucide={item.icon}
                      className={cx(
                        item.href === current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-5 w-5",
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

      <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        {children}
      </main>
    </div>
  </Layout>
);

const GeneralPage = () => (
  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profile
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Full name
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">Tom Cook</div>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Update
            </button>
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Email address
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">tom.cook@example.com</div>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Update
            </button>
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Title
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">Human Resources Manager</div>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Update
            </button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
);
