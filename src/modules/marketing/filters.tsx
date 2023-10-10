import { SelectTag } from "@/db/schema/tag";
import { button } from "@/ui/button";
import { Hover } from "@/ui/hover-transition";
import { cx } from "@/utils/cx";

export const Filters = ({ tags }: { tags: SelectTag[] }) => {
  return (
    <div class="relative h-10 px-1 sm:px-4">
      <div class="absolute inset-0 -z-10 mx-1 rounded-lg bg-card ring-1 ring-inset ring-border sm:mx-4" />
      <div
        class="mx-1 flex h-full items-center gap-3 overflow-auto px-1"
        _="on removeI tell <button /> in me remove .tag-indicator"
      >
        <div class="-mr-3 h-full py-2">
          <div id="clear-filters" />
        </div>
        <Hover class="flex gap-2">
          {tags.map((tag, i) => (
            <Hover.Item class="mt-0.5">
              {/*  @ts-ignore */}
              <button
                class={button({
                  size: "sm",
                  class: "query-listener capitalize",
                })}
                hx-get={`/q?tag=${tag.id}`}
                hx-vals='{"today":"true"}'
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
                preload
              >
                {tag.name}
              </button>
            </Hover.Item>
          ))}
        </Hover>
      </div>
      {/* Chevrons to scroll */}
      <button
        class={button({
          size: "icon",
          class:
            "absolute inset-y-0 left-1 flex h-10 w-12 items-center justify-center rounded-lg rounded-r-none border-y border-l border-border bg-gradient-to-r from-background from-50% to-transparent sm:left-4",
        })}
        id="left-chevron"
        _="on click go to middle left of #first-tag smoothly"
      >
        <i class="i-lucide-chevron-left h-5 w-5" />
      </button>

      <button
        class={button({
          size: "icon",
          class:
            "absolute inset-y-0 right-1 flex h-10 w-12 items-center justify-center rounded-lg rounded-l-none border-y border-r border-border bg-gradient-to-l from-background from-50% to-transparent sm:right-4",
        })}
        id="right-chevron"
        _="on click go to middle right of #last-tag smoothly"
      >
        <i class="i-lucide-chevron-right h-5 w-5" />
      </button>
    </div>
  );
};

export const ClearFilters = ({ tag }: { tag?: number }) => {
  if (!tag) return <div id="clear-filters" hx-swap-oob="true" />;

  return (
    <div
      id="clear-filters"
      hx-get="/q"
      hx-target="#results"
      hx-swap="outerHTML"
      hx-swap-oob="true"
      class={cx(
        "mr-1 flex h-full cursor-pointer items-center justify-center rounded p-1.5 font-light text-muted-foreground hover:bg-muted",
        !tag && "hidden",
        "query-listener",
      )}
      _="on click send removeI to closest <div />"
      title="Limpiar filtros"
    >
      <i class="i-lucide-x h-3.5 w-3.5" />
    </div>
  );
};
