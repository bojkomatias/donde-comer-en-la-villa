import { SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="container relative h-10 px-4">
      <div class="absolute inset-0 -z-10 mx-4 rounded bg-gray-50 ring-1 ring-inset ring-gray-500/5 dark:bg-gray-900/50" />
      <div class="mx-2 flex h-full items-center gap-3 overflow-auto">
        {tags.map((tag, i) =>
          i === 0 ? (
            <Button
              id="first-tag"
              size="sm"
              intent="outline"
              _="on intersection(intersecting) having threshold 0.9
                  if intersecting hide #left-chevron
                  else show #left-chevron"
            >
              {tag.name}
            </Button>
          ) : i === tags.length - 1 ? (
            <Button
              id="last-tag"
              size="sm"
              intent="outline"
              _="on intersection(intersecting) having threshold 0.9
                  if intersecting hide #right-chevron
                  else show #right-chevron"
            >
              {tag.name}
            </Button>
          ) : (
            <Button intent="outline" size="sm">
              {tag.name}
            </Button>
          ),
        )}
      </div>
      <div
        id="left-chevron"
        class="absolute inset-y-0 left-4 w-10 bg-gradient-to-r from-white to-transparent dark:from-gray-950"
      >
        <button
          class="flex h-full w-8 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-900"
          _="on click go to bottom left of #first-tag smoothly"
        >
          <i class="i-lucide-chevron-left h-5 w-5" />
        </button>
      </div>

      <div
        id="right-chevron"
        class="absolute inset-y-0 right-4 w-10 bg-gradient-to-l from-white to-transparent dark:from-gray-950"
      >
        <button
          class="flex h-full w-8 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-900"
          _="on click go to bottom right of #last-tag smoothly"
        >
          <i class="i-lucide-chevron-right h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
