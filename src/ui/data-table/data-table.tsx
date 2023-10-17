import { cx } from "@/utils/cx";
import { button } from "../button";
import { SearchBar } from "../search-bar";
import { Hover } from "../hover-transition";
import { Action, Column } from "./utils";
import { dict } from "@/utils/dictionary";
import { _content, _trigger, dropdown } from "../dropdown";
import { table } from "../table";

export function DataTable<T>({
  children,
  columns,
  search,
}: {
  children: any;
  columns: Column<T>[];
  search?: {
    "hx-get": GetRoutes;
    id: string;
    name: string;
    placeholder?: string;
    key: string;
  };
}) {
  return (
    <>
      <div class="mb-2 flex gap-1.5 px-px">
        {search ? (
          <SearchBar
            {...search}
            hx-trigger="keyup changed delay:500ms, search"
            hx-target="next tbody"
            hx-swap="innerHTML"
            hx-include="this"
            class="flex-grow"
          />
        ) : null}
        <button class={button({ intent: "outline", size: "icon" })}>
          <i class="i-lucide-sliders" />
        </button>
        {/* Column Visibility */}
        <div class={dropdown().base()}>
          <button
            class={button({ intent: "outline", size: "icon" })}
            _={_trigger}
          >
            <i class="i-lucide-table-properties" />
          </button>
          <div class={dropdown().content()} _={_content}>
            <div class={dropdown().header({ class: "text-sm font-semibold" })}>
              Columnas
            </div>
            <div class={dropdown().separator()} />
            <Hover>
              {columns
                .filter((e) => !e.disableHiding)
                .map(({ accessor, header, hidden }) => (
                  <Hover.Item>
                    <button
                      _={`on click tell #${String(
                        accessor,
                      )} in next <colgroup/> toggle .hidden end
                  on click tell .${String(
                    accessor,
                  )} in next <table/> toggle .hidden end
                    on click toggle .hidden on <i/> in me`}
                      class={dropdown().item()}
                    >
                      <span> {header ? header : dict.get(accessor)}</span>
                      <i class={cx("i-lucide-check", hidden && "hidden")} />
                    </button>
                  </Hover.Item>
                ))}
            </Hover>
          </div>
        </div>
      </div>
      <div class={table().wrapper()}>
        <table class={table().base()}>
          <colgroup>
            {columns.map(({ col, accessor, hidden }) => (
              <col id={String(accessor)} class={cx(col, hidden && "hidden")} />
            ))}
            <col class={"w-10"} />
          </colgroup>
          <thead class={table().head()}>
            <tr class={table().tr()}>
              {columns.map(({ accessor, header, sortable }) => (
                <th
                  class={table().th({ class: String(accessor) })}
                  _={`init if #${String(
                    accessor,
                  )} @class contains 'hidden' then add .hidden end`}
                >
                  {sortable ? (
                    <button
                      hx-get={search?.["hx-get"]}
                      hx-vals={`{ "orderBy": "${String(
                        accessor,
                      )}", "sort": "asc" }`}
                      hx-target="next tbody"
                      hx-swap="innerHTML"
                      class={button({ intent: "ghost", size: "xs" })}
                      _={`on click if @hx-vals contains 'asc' 
                        then set @hx-vals to '{ "orderBy": "${String(
                          accessor,
                        )}", "sort": "desc" }'
                        else set @hx-vals to '{ "orderBy": "${String(
                          accessor,
                        )}", "sort": "asc" }'`}
                    >
                      {header ? header : dict.get(accessor)}
                      <i class="i-lucide-chevrons-up-down" />
                    </button>
                  ) : (
                    <span class="ml-2 text-card-foreground">
                      {header ? header : dict.get(accessor)}
                    </span>
                  )}
                </th>
              ))}
              {/* Extra action column */}
              <th class={table().th({ class: "actions" })}>
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class={table().body()}>{children}</tbody>
        </table>
      </div>
    </>
  );
}

export function DataRows<T>({
  data,
  columns,
  actions,
  next,
}: {
  data: T[];
  columns: Column<T>[];
  actions: Action<T>[];
  next?: GetRoutes;
}) {
  return (
    <>
      {data.map((d) => (
        <tr class={table().tr()}>
          {columns.map(({ accessor, cell }) => (
            <td
              class={table().td({ class: String(accessor) })}
              _={`init if #${String(
                accessor,
              )} @class contains 'hidden' then add .hidden end`}
            >
              {cell ? cell(d) : d[accessor]}
            </td>
          ))}
          <td class={table().td({ class: "actions" })}>
            {actions.length > 0 ? (
              actions.length > 1 ? (
                <div class={dropdown().base()}>
                  <button
                    class={button({ intent: "ghost", size: "icon-xs" })}
                    _={_trigger}
                  >
                    <i class="i-lucide-more-horizontal" />
                  </button>
                  <div
                    class={dropdown().content({ class: "w-32 min-w-fit" })}
                    _={_content}
                  >
                    {actions.map(
                      (action) =>
                        // Can be conditional
                        action(d) && (
                          <button {...action(d)} class={dropdown().item()}>
                            {action(d).children}
                          </button>
                        ),
                    )}
                  </div>
                </div>
              ) : (
                <button class={button({ size: "xs" })} {...actions[0](d)} />
              )
            ) : null}
          </td>
        </tr>
      ))}
      {next ? (
        <tr
          hx-get={next}
          hx-swap="outerHTML"
          hx-target="this"
          hx-trigger="revealed"
        />
      ) : null}
    </>
  );
}
