import { Button } from "../../../../components/ui/button";
import { Tag } from "../../../../db/schema/tags";

export const TagRow = ({ tag }: { tag: Tag }) => {
  return (
    <tr key={tag.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium capitalize sm:pl-0">
        {tag.name}
      </td>
      <td className="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
        <Button
          hx-get={`/dashboard/tag/${tag.id}/form`}
          hx-target="closest tr"
          hx-swap="innerHTML"
          size="xs"
        >
          Edit<span className="sr-only">, {tag.name}</span>
        </Button>
      </td>
    </tr>
  );
};
