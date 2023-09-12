import { BaseHtml } from "./base-html";
import DarkMode from "./ui/dark-mode-toggle";
import { Input } from "./ui/input";

export function LandingPage() {
  return (
    <BaseHtml>
      <div class="m-6 flex items-center justify-end gap-6">
        <div hx-get="/login" hx-trigger="load" hx-swap="outerHTML" preload />
        <DarkMode />
      </div>
      <h2 class="text-center text-4xl font-semibold">
        Donde pingo se puede comer!!
      </h2>
      <p class="mb-12 text-center text-lg font-light italic">
        Estas cagado de hambre y no sabes donde mierda buscar? Llegaste al lugar
        correcto.
      </p>
      <div>
        <Input name="Search" />
      </div>
      <div hx-get="/business" hx-trigger="load" hx-swap="innerHTML"></div>
    </BaseHtml>
  );
}
