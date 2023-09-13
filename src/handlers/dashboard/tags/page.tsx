import { Button } from "../../../components/ui/button";
import { Tag } from "../../../db/schema/tags";
import { TagForm } from "./components/form";

export const TagPage = ({ tags }: { tags: Tag[] }) => (
  <>
    <div>
      <h1 className="text-base font-semibold leading-6 ">Tags</h1>
      <p className="mb-4 mt-2 text-sm text-gray-500">
        A list of all the tags in the application including their name, and
        adding an in row edit functionality.
      </p>
    </div>
    <div
      class="dark:bg-gray-850/40 rounded-lg bg-gray-50 p-4 pt-6"
      hx-ext="response-targets"
    >
      <h2 className="text-sm font-semibold leading-6">New tag</h2>
      <p className="mb-4 mt-1 text-xs text-gray-500">
        Add a new tag to the collection
      </p>
      <TagForm />
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
