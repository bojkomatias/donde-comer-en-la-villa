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
    <header class="flex items-end gap-2 border-b border-border px-4 pb-1 pt-3 sm:px-6 lg:px-16">
      <Tabs role={role} />
      <div class="h-0 flex-grow" />
      <div hx-get="/auth/navigation" hx-swap="outerHTML" hx-trigger="load" />
    </header>

    <div id="dashboard-content" class="min-h-screen px-0 pb-8 sm:px-6 lg:px-16">
      {children}
    </div>
  </BaseLayout>
);

const Tabs = ({ role }: { role: Role }) => (
  <nav class="overflow-x-auto rounded-lg bg-muted/40">
    <ul
      role="list"
      class="flex gap-x-2 whitespace-nowrap p-1 text-muted-foreground"
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
                "group relative flex w-full items-center justify-center gap-x-3 rounded-md px-3 py-1 text-sm font-semibold leading-6 hover:bg-muted",
              )}
              _="init if window.location.pathname === @hx-get then add .bg-muted .text-foreground end
              on htmx:afterOnLoad tell the target take .bg-muted take .text-foreground"
            >
              <i class={item.icon} aria-hidden="true" />
              {dict.get(item.name)}
            </button>
          </li>
        ))}
    </ul>
  </nav>
);
