import { Button } from "@/components/ui/button";

export const LoginButton = () => (
  <Button
    hx-get="/auth/form"
    hx-target="body"
    hx-swap="innerHTML"
    intent="primary"
    style="view-transition-name: sign"
  >
    Log In
  </Button>
);
