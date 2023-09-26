import { dict } from "@/utils/dictionary";
import { Button } from "./button";

export const BackButton = () => (
  <Button
    intent="ghost"
    size="xs"
    _="on click go back"
    class="mb-2 ml-4 w-fit sm:ml-0"
  >
    <i class="i-lucide-chevron-left" />
    {dict.get("back")}
  </Button>
);
