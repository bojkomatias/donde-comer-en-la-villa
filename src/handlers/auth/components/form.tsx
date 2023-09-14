import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SignInForm = (props: { csrfToken: string }) => {
  return (
    <div
      class="mx-auto mt-40 max-w-xl space-y-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-850"
      hx-target="this"
    >
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
          <Button
            intent="primary"
            class="flex-grow"

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
