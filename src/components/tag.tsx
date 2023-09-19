import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import type { Tag, InsertTag } from "@/db/schema/tags";
import { dict } from "@/utils/dictionary";

const Tags = ({ tags }: { tags: Tag[] }) => (
  <>
    <div>
      <h1 className="text-xl font-black capitalize leading-loose">
        {dict.get("tags")}
      </h1>
      <p className="mb-4 mt-2 text-sm text-gray-500">
        A list of all the tags in the application including their name, and
        adding an in row edit functionality.
      </p>
    </div>

    <Tags.New />

    <div className="-mx-4 mt-8 sm:-mx-0">
      <table className="min-w-full divide-y dark:divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
            >
              Name
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody id="tag-results" className="divide-y dark:divide-gray-700">
          {tags.map((tag) => (
            <Tags.Row tag={tag} />
          ))}
        </tbody>
      </table>
      {tags.length === 0 && (
        <div class="py-20 text-center text-sm font-light text-gray-400">
          No se encontraron categorías
        </div>
      )}
    </div>
  </>
);

Tags.Row = ({ tag }: { tag: Tag }) => {
  return (
    <tr key={tag.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium capitalize sm:pl-0">
        {tag.name}
      </td>
      <td className="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
        <Button
          hx-get={`/d/tag/${tag.id}/form`}
          hx-target="closest tr"
          hx-swap="innerHTML"
          size="xs"
        >
          {dict.get("edit")}
          <span className="sr-only">, {tag.name}</span>
        </Button>
      </td>
    </tr>
  );
};

Tags.Edit = ({ tag }: { tag: InsertTag }) => {
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
          hx-put={`/d/tag/${tag.id}`}
          hx-include="closest tr"
          hx-target-403="#row-error"
        >
          {dict.get("save")}
        </Button>
        <Button
          type="button"
          intent="secondary"
          size="xs"
          hx-get={`/d/tag/${tag.id}/row`}
        >
          {dict.get("cancel")}
        </Button>
      </td>
    </tr>
  );
};

Tags.New = () => {
  return (
    <div class="gap-6 rounded-lg bg-gray-50 p-4 pt-6 dark:bg-gray-900/50 sm:flex sm:justify-between">
      <div>
        <h2 className="text-sm font-semibold leading-6">
          Nueva {dict.get("tag")}
        </h2>
        <p className="mb-4 mt-1 text-xs text-gray-500">
          Add a new tag to the collection
        </p>
      </div>
      <form
        hx-post="/d/tag"
        hx-target="#tag-results"
        hx-swap="beforebegin"
        hx-target-403="#notification"
        class="flex-grow"
      >
        <Input
          type="text"
          name="name"
          placeholder="Pizzas a la piedra"
          required="true"
        />
        <span class="mt-2 flex justify-end">
          <Button intent="primary" size="sm">
            {dict.get("save")}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Tags;
