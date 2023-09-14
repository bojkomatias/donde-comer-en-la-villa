import { InsertTag } from "@/db/schema/tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TagFormRow = ({ tag }: { tag: InsertTag }) => {
  return (
    <tr key={tag.id} hx-target="this" hx-swap="outerHTML">
      <td class="flex-grow">
        <Input
          type="text"
          name="name"
          placeholder="Panificados"
          class="flex-grow"
          value={tag.name}
          required="true"
        />
        <span id="row-error" />
      </td>
      <td class="flex items-end justify-end gap-2 whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
        <Button
          intent="primary"
          size="xs"
          hx-put={`/dashboard/tag/${tag.id}`}
          hx-include="closest tr"
          hx-target-403="#row-error"
        >
          Save
        </Button>
        <Button
          type="button"
          intent="secondary"
          size="xs"
          hx-get={`/dashboard/tag/${tag.id}/row`}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};
