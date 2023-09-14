import { dashboardNav } from "@/config/dashboard";
import { cx } from "@/utils/cx";
import { JWTPayloadSpec } from "@elysiajs/jwt";

type User =
  | ({
      id: string;
      name: string;
      email: string;
      role: "customer" | "owner" | "admin";
    } & JWTPayloadSpec)
  | null;

export const UserNavigation = ({ user }: { user: User }) => {
  if (!user) return <></>;
  return (
    <>
      <div class="px-4 py-3">
        <div class="text-sm font-semibold leading-loose">{user.name}</div>
        <span class="text-xs font-light text-gray-500">{user.email}</span>
      </div>
      <nav class="py-1">
        {dashboardNav
          .filter((link) => link.clearance?.includes(user.role))
          .map((item) => (
            <a
              href={item.href}
              hx-push-url="true"
              class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-400/10"
            >
              <i class={cx(item.icon, "h-4 w-4 text-gray-500")} />
              {item.name}
            </a>
          ))}
      </nav>
    </>
  );
};
