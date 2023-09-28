import { SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";
import { Hover } from "@/ui/hover-transition";
import { cx } from "@/utils/cx";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="relative h-10 px-4 lg:col-span-2 lg:pl-2">
      <div class="absolute inset-0 -z-10 mx-4 rounded-lg bg-card ring-1 ring-inset ring-border lg:ml-2" />
      <div
        class="mx-1 flex h-full items-center gap-3 overflow-auto px-1"
        _="on removeI tell <button /> in me remove .tag-indicator"
      >
        <div class="-mr-3 h-full py-2">
          <div id="clear-filters" />
        </div>
        <Hover class="flex gap-2">
          {tags.map((tag, i) => (
            <Hover.Item>
              <Button
                hx-get={`/filter?tag=${tag.id}`}
                hx-target="#results"
                hx-swap="outerHTML"
                id={
                  i === 0
                    ? "first-tag"
                    : i === tags.length - 1
                    ? "last-tag"
                    : ""
                }
                _={cx(
                  i === 0 &&
                    "on intersection(intersecting) having threshold 0.9 if intersecting hide #left-chevron else show #left-chevron end",
                  i === tags.length - 1 &&
                    "on intersection(intersecting) having threshold 0.9 if intersecting hide #right-chevron else show #right-chevron end",
                  "on click send removeI to closest <div /> wait then add .tag-indicator on me end",
                )}
                size="sm"
                class="capitalize"
                preload
              >
                {tag.name}
              </Button>
            </Hover.Item>
          ))}
        </Hover>
      </div>
      {/* Chevrons to scroll */}
      <Button
        id="left-chevron"
        size="icon"
        class="absolute inset-y-0 left-4 flex h-10 w-12 items-center justify-center rounded-l bg-gradient-to-r from-background from-50% to-transparent lg:left-2"
        _="on click go to middle left of #first-tag smoothly"
      >
        <i class="i-lucide-chevron-left h-5 w-5" />
      </Button>

      <Button
        id="right-chevron"
        size="icon"
        class="absolute inset-y-0 right-4 flex h-10 w-12 items-center justify-center rounded-r bg-gradient-to-l from-background from-50% to-transparent"
        _="on click go to middle right of #last-tag smoothly"
      >
        <i class="i-lucide-chevron-right h-5 w-5" />
      </Button>
    </div>
  );
};
