import { Button } from "@/ui/button";
import Dropdown from "@/ui/dropdown";
import { dict } from "@/utils/dictionary";
import { JWTPayloadSpec } from "@elysiajs/jwt";

type User =
  | ({
      id: string;
      name: string;
      image: string | null;
      email: string;
      role: "customer" | "owner" | "admin";
    } & JWTPayloadSpec)
  | null;

export const UserNavigation = ({ user }: { user: User }) => {
  if (!user) return <></>;
  return (
    <Dropdown>
      <Dropdown.Trigger size="icon">
        {user.image ? (
          <img
            src={user.image}
            class="h-8 w-8 overflow-hidden rounded-full"
            alt="User image"
          />
        ) : (
          <i class="i-lucide-user-circle-2 h-8 w-8 overflow-hidden rounded-full opacity-80 hover:opacity-100" />
        )}
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Header>
          <div class="text-sm font-semibold" safe>
            {user.name}
          </div>
          <div class="text-xs font-light leading-5 text-muted-foreground" safe>
            {user.email}
          </div>
        </Dropdown.Header>
        <Dropdown.Separator />
        <Dropdown.Item
          as="a"
          href="/d/business"
          hx-boost="true"
          _="htmx:afterOnLoad if window.location.pathname === @href then set @disabled end"
        >
          {dict.get("dashboard")}
        </Dropdown.Item>
        <Dropdown.Item
          as="a"
          href="/d/settings"
          hx-boost="true"
          _="htmx:afterOnLoad if window.location.pathname === @href then set @disabled end"
        >
          {dict.get("settings")}
          <i class="i-lucide-settings" />
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item as="a" href="/" hx-boost="true">
          Página de inicio <i class="i-lucide-external-link" />
        </Dropdown.Item>
        <Dropdown.Item
          hx-post="/auth/logout"
          hx-push-url="true"
          hx-target="body"
          hx-swap="outerHTML"
          class="font-semibold"
        >
          {dict.get("logout")}
          <i class="i-lucide-log-out" />
        </Dropdown.Item>
        <Dropdown.Separator />
        <Button intent="primary" size="sm" class="m-2 w-56">
          Upgrade to Pro
        </Button>
      </Dropdown.Content>
    </Dropdown>
  );
};
