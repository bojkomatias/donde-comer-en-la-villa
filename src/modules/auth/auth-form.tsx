import { buttonStyles, Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { dict } from "@/utils/dictionary";

const google = new URL("auth", "https://accounts.google.com/o/oauth2/v2/");
google.searchParams.set(
  "redirect_uri",
  "http://localhost:3000/auth/callback/google/",
);
google.searchParams.set("response_type", "code");
google.searchParams.set("scope", "profile email");
google.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);

export const AuthForm = (props: { csrfToken: string }) => {
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
