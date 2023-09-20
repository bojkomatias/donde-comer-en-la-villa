
import { dashboardNav } from "@/config/dashboard";
import { buttonStyles, Button } from "@/ui/button";
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
    <div class="mx-auto mt-20 max-w-xl space-y-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-900/50">
      <a href="/" class={buttonStyles({ size: "sm" })}>
        <i class="i-lucide-chevron-left" />
        {dict.get("back")}
      </a>
      <p class="text-xl">Volviste!</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        Ingresá con Google o autenticate con tus credenciales.
      </p>
      <a
        href={google.href}
        class={buttonStyles({
          class:
            "w-full flex-grow bg-white font-medium text-black ring-1 ring-gray-500/50 transition hover:shadow dark:hover:bg-gray-200",
        })}
      >
        <img
          src="/public/google-svg.svg"
          class="-ml-4 mr-4 h-5 w-5 rounded-full"
        />{" "}
        Ingresar con Google
      </a>
      <form
        hx-post="/auth/login"
        hx-target-4xx="#notification"
        hx-target="body"
      >
        <input
          type="text"
          name="csrfToken"
          value={props.csrfToken}
          class="hidden"
        />
        <div class="isolate">
          <Input
            name="email"
            placeholder="example@example.com"
            type="email"
            required="true"
          />
          <Input
            name="password"
            placeholder="***********"
            type="password"
            required="true"
          />
        </div>
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
    hx-get="/auth/form"
    hx-target="main"
    hx-swap="innerHTML"
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
    <div
      id="menu"
      class="relative inline-block text-left"
      hx-target="body"
      hx-swap="innerHTML"
    >
      <Button
        _="on click halt 
        on click send change to #dropdown end
        on keyup
         if the event's key is 'Escape'
           add .hidden to #dropdown
           trigger keyup
        end"
        class="rounded-full p-0"
      >
        {user.image ? (
          <img
            src={user.image}
            class="h-8 w-8 overflow-hidden rounded-full"
            alt="User image"
          />
        ) : (
          <i class="i-lucide-user-circle-2 h-8 w-8 overflow-hidden rounded-full opacity-80 hover:opacity-100" />
        )}
      </Button>

      <div
        id="dropdown"
        role="menu"
        class="dropdown absolute right-0 z-10 mt-1 hidden w-56 origin-top-right scale-95 divide-y divide-gray-100 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-gray-200 transition duration-150 ease-in-out focus:outline-none dark:divide-gray-800 dark:bg-gray-950 dark:shadow-black dark:ring-gray-800"
        _="on change 
        if @class contains 'hidden' 
          then toggle .hidden on me wait
            then toggle .opacity-0 .scale-95 on me
        else toggle .opacity-0 .scale-95 on me settle then add .hidden to me"
      >
        <div class="px-4 py-3">
          <div class="text-sm font-semibold leading-loose" safe>
            {user.name}
          </div>
          <span class="text-xs font-light text-gray-500" safe>
            {user.email}
          </span>
        </div>
        <nav class="py-1">
          {dashboardNav
            .filter((link) => link.clearance?.includes(user.role))
            .map((item) => (
              <button
                hx-get={item.href}
                hx-push-url="true"
                hx-target="main"
                hx-swap="innerHTML"
                class="flex w-full items-center gap-3 px-4 py-3 text-sm capitalize hover:bg-gray-400/10"
              >
                <i class={cx(item.icon, "h-4 w-4 text-gray-500")} />
                {dict.get(item.name)}
              </button>
            ))}
        </nav>
        <button
          hx-post="/auth/logout"
          hx-push-url="true"
          class="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold capitalize hover:bg-gray-400/10"
          tabindex="-1"
        >
          <i class="i-lucide-log-out h-4 w-4 text-gray-500" />
          {dict.get("logout")}
        </button>
      </div>
    </div>
  );
};

export default Auth;
