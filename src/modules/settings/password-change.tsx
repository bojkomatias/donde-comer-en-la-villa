import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { dict } from "@/utils/dictionary";

export const PasswordChange = () => (
  <div class="mt-16 bg-gray-50 p-4 dark:bg-gray-900/50 sm:mt-20 sm:rounded-lg">
    <h2 class="text-base font-semibold leading-loose first-letter:capitalize">
      {dict.get("update")} {dict.get("password")}
    </h2>
    <p class="mb-4 text-sm leading-6 text-gray-500">
      On password change current session will continue to exists, and changes
      take effect the next time you log in.
    </p>
    <form
      hx-patch="/d/password"
      hx-target="#notification"
      hx-target-403="#notification"
      hx-swap="none"
      class=""
    >
      <Input
        name="currentPassword"
        placeholder="********"
        type="password"
        required="true"
      />
      <Input
        name="password"
        placeholder="**********"
        type="password"
        required="true"
      />

      <span class="mt-2 flex justify-end">
        <Button intent="destructive" size="sm">
          {dict.get("update")} {dict.get("password")}
        </Button>
      </span>
    </form>
  </div>
);
