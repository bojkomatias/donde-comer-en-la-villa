import { SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";
import { cx } from "@/utils/cx";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="container relative h-10 px-4 lg:col-span-2 lg:pl-2">
      <div class="absolute inset-0 -z-10 mx-4 rounded bg-gray-50 ring-1 ring-inset ring-gray-500/5 dark:bg-gray-900/50 lg:ml-2" />
      <div
        class="mx-2 flex h-full items-center gap-3 overflow-auto"
        _="on removeI tell <button /> in me remove .bg-cyan-50 .ring-cyan-500 .text-cyan-600"
      >
        <div class="-mr-3 h-full py-2">
          <div id="clear-filters" />
        </div>
        {tags.map((tag, i) => (
          <Button
            hx-get={`/filter?tag=${tag.id}`}
            hx-target="#results"
            hx-swap="outerHTML"
            id={i === 0 ? "first-tag" : i === tags.length - 1 ? "last-tag" : ""}
            _={cx(
              i === 0 &&
                "on intersection(intersecting) having threshold 0.9 if intersecting hide #left-chevron else show #left-chevron end",
              i === tags.length - 1 &&
                "on intersection(intersecting) having threshold 0.9 if intersecting hide #right-chevron else show #right-chevron end",
              "on click send removeI to closest <div /> wait then add .bg-cyan-50 .ring-cyan-500 .text-cyan-600 on me end",
            )}
            intent="outline"
            size="sm"
          >
            {tag.name}
          </Button>
        ))}
      </div>
      {/* Chevrons to scroll */}
      <button
        id="left-chevron"
        class="absolute inset-y-0 left-4 flex w-11 items-center justify-center rounded-l border-y border-l border-gray-500/5 bg-gradient-to-r from-gray-50 from-50% to-transparent dark:from-gray-900/50 lg:left-2"
        _="on click go to bottom left of #first-tag smoothly"
      >
        <i class="i-lucide-chevron-left h-5 w-5" />
      </button>

      <button
        id="right-chevron"
        class="absolute inset-y-0 right-4 flex w-11 items-center justify-center rounded-r border-y border-r border-gray-500/5 bg-gradient-to-l from-gray-50 from-50% to-transparent dark:from-gray-900/50"
        _="on click go to bottom right of #last-tag smoothly"
      >
        <i class="i-lucide-chevron-right h-5 w-5" />
      </button>
    </div>
  );
};
