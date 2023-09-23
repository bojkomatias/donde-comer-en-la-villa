import { InsertTag, SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { Input } from "@/ui/input";
import { dict } from "@/utils/dictionary";

const Tags = ({ tags }: { tags: SelectTag[] }) => (
  <>
    <div>
      <DashboardHeading
        title={dict.get("tags")}
        subtitle="Categorías para clasificar productos y negocios"
      />
    </div>
    <div class="relative mt-8 max-h-96 overflow-auto pr-2">
      {tags.length > 0 ? (
        <table class="min-w-full">
          <thead class="sticky top-0 bg-white dark:bg-gray-950">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold capitalize sm:pl-0"
              >
                {dict.get("name")}
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody id="tag-results" class="divide-y dark:divide-gray-700">
            {tags.map((tag) => (
              <Tags.Row tag={tag} />
            ))}
          </tbody>
        </table>
      ) : (
        <div class="py-20 text-center text-sm font-light text-gray-400">
          No se encontraron categorías
        </div>
      )}
    </div>
    <span class="pl-4 text-xs font-thin sm:pl-0">
      Total de {dict.get("tags")}: <b>{tags.length}</b>
    </span>
    <Tags.New />
  </>
);

Tags.Row = ({ tag }: { tag: SelectTag }) => {
  return (
    <tr>
      <td
        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium capitalize sm:pl-0"
        safe
      >
        {tag.name}
      </td>
      <td class="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
        <Button
          hx-get={`/d/tag/${tag.id}/form`}
          hx-target="closest tr"
          hx-swap="outerHTML"
          size="xs"
        >
          {dict.get("edit")}
        </Button>
      </td>
    </tr>
  );
};

Tags.Edit = ({ tag }: { tag: InsertTag }) => {
  return (
    <tr hx-target="this">
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
          hx-swap="outerHTML"
          hx-target-403="#row-error"
        >
          {dict.get("save")}
        </Button>
        <Button
          type="button"
          intent="secondary"
          size="xs"
          hx-get={`/d/tag/${tag.id}/row`}
          hx-swap="outerHTML"
        >
          {dict.get("cancel")}
        </Button>
      </td>
    </tr>
  );
};

Tags.New = () => {
  return (
    <div class="mt-8 gap-6 bg-gray-50 p-4 pt-6 dark:bg-gray-900/50 sm:flex sm:justify-between sm:rounded-lg">
      <div>
        <DashboardHeading
          title={"Nueva " + dict.get("tag")}
          subtitle="Agrega nueva categoría a la colección"
        />
      </div>
      <form
        hx-post="/d/tag"
        hx-target="#tag-results"
        hx-swap="beforebegin"
        hx-target-4xx="#notification"
        _="on submit log 'xd'"
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
