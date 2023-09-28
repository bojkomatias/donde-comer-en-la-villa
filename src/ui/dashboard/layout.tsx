import { dashboardNav } from "@/config/dashboard";
import { Role } from "@/db/schema/user";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";
import { BaseLayout } from "../layout";

export const DashboardLayout = ({
  role,
  children,
}: {
  role: Role;
  children?: any;
}) => (
  <BaseLayout>
    <header class="flex flex-col items-end border-b border-border pt-2">
      <div hx-get="/auth/navigation" hx-swap="outerHTML" hx-trigger="load" />
      <Tabs role={role} />
    </header>

    <main id="dashboard-content" class="min-h-screen pb-8">
      {children}
    </main>
  </BaseLayout>
);

const Tabs = ({ role }: { role: Role }) => (
  <nav class="-mb-px w-full self-start overflow-x-auto rounded-lg lg:px-8">
    <ul
      role="list"
      class="flex gap-x-2 whitespace-nowrap text-muted-foreground"
    >
      {dashboardNav
        .filter((link) => link.clearance?.includes(role))
        .map((item) => (
          <li>
            <button
              hx-get={item.href}
              hx-push-url="true"
              hx-target="#dashboard-content"
              hx-swap="innerHTML"
              class={cx(
                "group relative flex w-full items-center justify-center gap-x-3 rounded-md px-3 py-1 text-sm font-semibold leading-6 before:absolute before:inset-0.5 before:-z-10 before:rounded-lg before:bg-muted before:opacity-0 hover:text-foreground hover:before:opacity-50",
              )}
              _="init if window.location.pathname === @hx-get then add .navigation-indicator end
              on htmx:afterOnLoad tell the target take .navigation-indicator"
            >
              <i class={item.icon} aria-hidden="true" />
              {dict.get(item.name)}
            </button>
          </li>
        ))}
    </ul>
  </nav>
);
