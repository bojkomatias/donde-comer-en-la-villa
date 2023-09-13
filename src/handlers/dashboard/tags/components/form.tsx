import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TagForm = () => {
  return (
    <div>
      <form
        hx-post="/dashboard/tag"
        hx-target="#tag-results"
        hx-swap="beforebegin"
        hx-target-403="#error"
        class="flex items-end gap-6 pr-0 sm:pr-16"
      >
        <div class="flex-grow">
          <Input
            type="text"
            name="name"
            placeholder="Pizzas a la piedra"
            required="true"
          />
        </div>
        <Button intent="primary" size="sm">
          Crear
        </Button>
      </form>
      <p id="error" />
    </div>
  );
};
