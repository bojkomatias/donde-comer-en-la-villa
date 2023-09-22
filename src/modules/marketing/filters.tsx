import { SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="container relative h-10 px-6">
      <div class="flex gap-3 overflow-auto pb-2.5">
        {tags.map((tag, i) =>
          i === 0 ? (
            <Button
              id="first-tag"
              size="sm"
              _="on intersection(intersecting) having threshold 0.5
                  if intersecting hide #left-chevron
                  else show #left-chevron"
            >
              {tag.name}
            </Button>
          ) : i === tags.length - 1 ? (
            <Button
              id="last-tag"
              size="sm"
              _="on intersection(intersecting) having threshold 0.5
                  if intersecting hide #right-chevron
                  else show #right-chevron"
            >
              {tag.name}
            </Button>
          ) : (
            <Button size="sm">{tag.name}</Button>
          ),
        )}
      </div>
      <div
        id="left-chevron"
        class="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent dark:from-gray-950"
      >
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full active:bg-gray-50 dark:active:bg-gray-900"
          _="on click go to bottom left of #first-tag smoothly"
        >
          <i class="i-lucide-chevron-left h-5 w-5" />
        </button>
      </div>

      <div
        id="right-chevron"
        class="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent dark:from-gray-950"
      >
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full active:bg-gray-50 dark:active:bg-gray-900"
          _="on click go to bottom right of #last-tag smoothly"
        >
          <i class="i-lucide-chevron-right h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
