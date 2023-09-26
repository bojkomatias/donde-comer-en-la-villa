import { SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";
import { cx } from "@/utils/cx";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="relative h-10 px-4 lg:col-span-2 lg:pl-2">
      <div class="absolute inset-0 -z-10 mx-4 rounded bg-gray-50 ring-1 ring-inset ring-gray-500/5 dark:bg-gray-900/50 lg:ml-2" />
      <div
        class="mx-2 flex h-full items-center gap-3 overflow-auto"
        _="on removeI tell <button /> in me remove .tag-indicator"
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
              "on click send removeI to closest <div /> wait then add .tag-indicator on me end",
            )}
            intent="secondary"
            class="transition duration-150 ease-in-out"
            size="sm"
            preload
          >
            {tag.name}
          </Button>
        ))}
      </div>
      {/* Chevrons to scroll */}
      <button
        id="left-chevron"
        class="absolute inset-y-0 left-4 flex w-11 items-center justify-center rounded-l bg-gradient-to-r from-white from-30% to-transparent dark:from-gray-950 lg:left-2"
        _="on click go to bottom left of #first-tag smoothly"
      >
        <i class="i-lucide-chevron-left h-5 w-5" />
      </button>

      <button
        id="right-chevron"
        class="absolute inset-y-0 right-4 flex w-11 items-center justify-center rounded-r bg-gradient-to-l from-white from-30% to-transparent dark:from-gray-950"
        _="on click go to bottom right of #last-tag smoothly"
      >
        <i class="i-lucide-chevron-right h-5 w-5 drop-shadow" />
      </button>
    </div>
  );
};
