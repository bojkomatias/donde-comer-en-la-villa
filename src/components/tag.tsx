import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import type { Tag, InsertTag } from "@/db/schema/tags";

const Tags = ({ tags }: { tags: Tag[] }) => (
  <>
    <div>
      <h1 className="text-base font-semibold leading-6 ">Tags</h1>
      <p className="mb-4 mt-2 text-sm text-gray-500">
        A list of all the tags in the application including their name, and
        adding an in row edit functionality.
      </p>
    </div>
    <div class="rounded-lg bg-gray-50 p-4 pt-6 dark:bg-gray-900/50">
      <h2 className="text-sm font-semibold leading-6">New tag</h2>
      <p className="mb-4 mt-1 text-xs text-gray-500">
        Add a new tag to the collection
      </p>
      <Tags.New />
    </div>
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
            <tr key={tag.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium capitalize sm:pl-0">
                {tag.name}
              </td>
              <td className="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                <Button
                  hx-get={`/dashboard/tag/${tag.id}/form`}
                  hx-target="closest tr"
                  hx-swap="outerHTML"
                  size="xs"
                >
                  Edit<span className="sr-only">, {tag.name}</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tags.length === 0 && (
        <div class="py-20 text-center text-xs font-light text-gray-400">
          No tags found
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

Tags.New = () => {
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
            label="tag name"
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

export default Tags;
