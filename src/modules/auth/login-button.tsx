import { button } from "@/ui/button";
import { dict } from "@/utils/dictionary";

export const LoginButton = () => (
  <button
    class={button({ intent: "primary", class: "mr-4" })}
    hx-get="/login"
    hx-target="#page-content"
    hx-swap="innerHTML"
    hx-push-url="true"
  >
    {dict.get("login")}
  </button>
);
