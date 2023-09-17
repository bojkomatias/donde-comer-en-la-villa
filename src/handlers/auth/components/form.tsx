import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const google = new URL("auth", "https://accounts.google.com/o/oauth2/v2/");
google.searchParams.set(
  "redirect_uri",
  "http://localhost:3000/auth/callback/google/",
);
google.searchParams.set("response_type", "code");
google.searchParams.set("scope", "profile email");
google.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);

export const SignInForm = (props: { csrfToken: string }) => {
  return (
    <div class="mx-auto mt-40 max-w-xl space-y-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-900/50">
      <a href="/" class={buttonStyles({ size: "sm" })}>
        <i class="i-lucide-chevron-left" />
        Back
      </a>
      <p class="text-xl">Welcome back!</p>
      <p class="text-sm text-gray-600">
        Authenticate to visit your business dashboard
      </p>
      <form
        hx-post="/auth/login"
        hx-target-4xx="#notification"
        // Target body cause it's a full page redirect
        hx-target="body"
        // hx-push-url="true"
      >
        <input
          type="text"
          name="csrfToken"
          value={props.csrfToken}
          class="hidden"
        />
        <div class="isolate -space-y-px">
          <Input
            name="email"
            label="email"
            placeholder="example@example.com"
            type="email"
            required="true"
          />
          <Input
            name="password"
            label="password"
            placeholder="***********"
            type="password"
            required="true"
          />
        </div>
        <div class="m-4 flex gap-6">
          <Button intent="primary" class="flex-grow">
            Login
          </Button>
          <Button class="flex-grow" disabled="true">
            Crear cuenta
          </Button>
        </div>
        <div class="m-4 flex gap-6">
          <button
            intent="primary"
            class={buttonStyles({
              intent: "secondary",
              class: "flex-grow",
            })}
            disabled=""
          >
            <img
              src="/public/google-svg.svg"
              class="mr-2 h-5 w-5 rounded-full"
            />
          </button>
          <a
            href={google.href}
            intent="primary"
            class={buttonStyles({
              intent: "secondary",
              class: "flex-grow",
            })}
          >
            <img
              src="/public/google-svg.svg"
              class="mr-2 h-5 w-5 rounded-full"
            />
          </a>
          <button
            href={google.href}
            intent="primary"
            class={buttonStyles({
              intent: "secondary",
              class: "flex-grow",
            })}
            disabled=""
          >
            <img
              src="/public/google-svg.svg"
              class="mr-2 h-5 w-5 rounded-full"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
