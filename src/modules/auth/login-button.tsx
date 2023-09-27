import { Button } from "@/ui/button";
import { dict } from "@/utils/dictionary";

export const LoginButton = () => (
  <Button
    hx-get="/login"
    hx-target="#page-content"
    hx-swap="innerHTML"
    hx-push-url="true"
    intent="primary"
  >
    {dict.get("login")}
  </Button>
);
