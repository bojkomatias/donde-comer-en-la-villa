import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export const SignInForm = (props: { csrfToken: string }) => {
  return (
    <div class="mx-auto max-w-xl space-y-8 pt-40" hx-target="this">
      <Button hx-get="/" hx-swap="outerHTML">
        <i class="i-lucide-chevron-left" />
        Back
      </Button>
      <p class="text-xl">Welcome back!</p>
      <p class="text-sm text-gray-600">
        Authenticate to visit your business dashboard
      </p>
      <form
        hx-post="/auth/login"
        hx-target-404="#not-found"
        hx-swap="outerHTML"
      >
        <input
          type="text"
          name="csrfToken"
          value={props.csrfToken}
          class="hidden"
        />
        <div class="isolate -space-y-px rounded-md shadow-sm">
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
        <div class="m-4 flex gap-6">
          <Button
            intent="primary"
            class="flex-grow"
            style="view-transition-name: sign"
          >
            Log In
          </Button>
          <Button class="flex-grow" disabled="true">
            Crear cuenta
          </Button>
        </div>

        <div id="not-found" />
      </form>
    </div>
  );
};
