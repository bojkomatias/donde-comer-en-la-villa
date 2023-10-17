import { button } from "@/ui/button";
import { dict } from "@/utils/dictionary";

const google = new URL("auth", "https://accounts.google.com/o/oauth2/v2/");
google.searchParams.set(
  "redirect_uri",
  "http://localhost:3000/auth/callback/google/",
);
google.searchParams.set("response_type", "code");
google.searchParams.set("scope", "profile email");
google.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);

export const LoginButton = () => (
  <a
    href={google.href}
    class={button({
      intent: "outline",
      class: "mr-4 bg-white text-black/80 hover:bg-white hover:ring-ring",
    })}
  >
    <img src="/public/google-svg.svg" class="h-5 w-5 rounded-full" />
    {dict.get("login")}
  </a>
);
