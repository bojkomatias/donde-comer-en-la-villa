import { dict } from "@/utils/dictionary";
import { button } from "./button";

export const BackButton = () => (
  <button
    class={button({ intent: "ghost", size: "xs", class: "mb-2 w-fit" })}
    _="on click go back"
  >
    <i class="i-lucide-chevron-left" />
    {dict.get("back")}
  </button>
);
