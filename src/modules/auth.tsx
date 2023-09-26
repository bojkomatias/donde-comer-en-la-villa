import { dashboardNav } from "@/config/dashboard";
import { buttonStyles, Button } from "@/ui/button";
import Dropdown from "@/ui/dropdown";
import { Input } from "@/ui/input";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";
import { JWTPayloadSpec } from "@elysiajs/jwt";

const google = new URL("auth", "https://accounts.google.com/o/oauth2/v2/");
google.searchParams.set(
  "redirect_uri",
  "http://localhost:3000/auth/callback/google/",
);
google.searchParams.set("response_type", "code");
google.searchParams.set("scope", "profile email");
google.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);

const Auth = () => null;

Auth.Form = (props: { csrfToken: string }) => {
  return (
    <div class="mx-auto mt-20 max-w-xl space-y-8 bg-card p-6 sm:rounded-xl">
      <Button size="xs" _="on click go back">
        <i class="i-lucide-chevron-left" />
        {dict.get("back")}
      </Button>
      <p class="text-xl">Volviste!</p>
      <p class="text-sm">
        Ingresá con Google o autenticate con tus credenciales.
      </p>
      <a
        href={google.href}
        class={buttonStyles({
          intent: "primary",
          class:
            "w-full bg-foreground text-muted hover:bg-foreground hover:text-background",
        })}
      >
        <img
          src="/public/google-svg.svg"
          class="-ml-4 mr-4 h-5 w-5 rounded-full"
        />
        Ingresar con Google
      </a>
      <form
        hx-post="/auth/login"
        hx-target-4xx="#notification"
        hx-target="body"
        hx-push-url="true"
      >
        <input
          type="text"
          name="csrfToken"
          value={props.csrfToken}
          class="hidden"
        />
        <Input
          name="email"
          placeholder="example@example.com"
          type="email"
          required="true"
          rt
        />
        <Input
          name="password"
          placeholder="***********"
          type="password"
          required="true"
          rb
        />
        <div class="mt-6 flex gap-6">
          <Button intent="primary" class="w-1/2">
            Login
          </Button>
          <Button type="reset" intent="secondary" class="w-1/2">
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

Auth.Login = () => (
  <Button
    hx-get="/login"
    hx-target="main"
    hx-swap="innerHTML"
    hx-push-url="true"
    intent="primary"
  >
    {dict.get("login")}
  </Button>
);

type User =
  | ({
      id: string;
      name: string;
      image: string | null;
      email: string;
      role: "customer" | "owner" | "admin";
    } & JWTPayloadSpec)
  | null;

Auth.Navigation = ({ user }: { user: User }) => {
  if (!user) return <></>;
  return (
    <Dropdown hx-target="body" hx-swap="innerHTML">
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
        <Dropdown.Item as="a" href="/d" hx-boost="true">
          {dict.get("dashboard")}
        </Dropdown.Item>
        <Dropdown.Item as="a" href="/d" hx-boost="true">
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

export default Auth;
