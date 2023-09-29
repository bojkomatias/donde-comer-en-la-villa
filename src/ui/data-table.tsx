import { cx } from "@/utils/cx";
import Table from "./table";
import Dropdown from "./dropdown";
import { Button } from "./button";
import { SearchBar } from "./search-bar";
import { Hover } from "./hover-transition";

/**
 * Used to define the columns on your module component
 * (eg: BusinessTable T will be SelectBusiness)
 * @T Generic type
 */
export type Column<T> = {
  accessor: keyof T;
  header: string;
  cell?: (r: T) => JSX.Element;
  disableHiding?: true;
  hidden?: true;
  col?: string;
};

/**
 * Used to pass the allowed actions through props only  (injected in component)
 * @T Generic type (equivalent to row.original)
 */
export type Action<T> = (r: T) => JSX.HtmlTag | false;

export function DataTable<T>({
  children,
  columns,
  search,
}: {
  children: any;
  columns: Column<T>[];
  search?: {
    "hx-get": string;
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
        <Button intent="outline" size="icon">
          <i class="i-lucide-sliders" />
        </Button>
        <Dropdown>
          <Dropdown.Trigger intent="outline" size="icon">
            <i class="i-lucide-table-properties" />
          </Dropdown.Trigger>
          <Dropdown.Content class="w-40">
            <Hover>
              {columns
                .filter((e) => !e.disableHiding)
                .map(({ accessor, header, hidden }) => (
                  <Hover.Item>
                    <Dropdown.Item
                      _={`on click tell #${String(
                        accessor,
                      )} in next <colgroup/> toggle .hidden end
                  on click tell .${String(
                    accessor,
                  )} in next <table/> toggle .hidden end
                    on click toggle .hidden on <i/> in me`}
                      size="sm"
                    >
                      <span>{header}</span>
                      <i class={cx("i-lucide-check", hidden && "hidden")} />
                    </Dropdown.Item>
                  </Hover.Item>
                ))}
            </Hover>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <Table>
        <colgroup>
          {columns.map(({ col, accessor, hidden }) => (
            <col id={String(accessor)} class={cx(col, hidden && "hidden")} />
          ))}
          <col class={"w-10"} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            {columns.map(({ accessor, header }) => (
              <Table.HCell
                _={`init if #${String(
                  accessor,
                )} @class contains 'hidden' then add .hidden end`}
                class={cx(String(accessor))}
              >
                {header}
              </Table.HCell>
            ))}
            {/* Extra action column */}
            <Table.HCell class={"actions"}>
              <span class="sr-only">Actions</span>
            </Table.HCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{children}</Table.Body>
      </Table>
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
  next?: string;
}) {
  return (
    <>
      {data.map((d) => (
        <Table.Row>
          {columns.map(({ accessor, cell }) => (
            <Table.Cell
              _={`init if #${String(
                accessor,
              )} @class contains 'hidden' then add .hidden end`}
              class={cx(String(accessor))}
            >
              {cell ? cell(d) : d[accessor]}
            </Table.Cell>
          ))}
          <Table.Cell class={"actions"}>
            {actions.length > 0 ? (
              actions.length > 1 ? (
                <Dropdown>
                  <Dropdown.Trigger intent="ghost" size="icon">
                    <i class="i-lucide-more-horizontal" />
                  </Dropdown.Trigger>
                  <Dropdown.Content position="right-top" class="w-28">
                    {actions.map(
                      (action) =>
                        action(d) && (
                          <Dropdown.Item
                            intent="ghost"
                            size="sm"
                            {...action(d)}
                          />
                        ),
                    )}
                  </Dropdown.Content>
                </Dropdown>
              ) : (
                <Button intent="secondary" size="xs" {...actions[0](d)} />
              )
            ) : null}
          </Table.Cell>
        </Table.Row>
      ))}
      {next ? (
        <Table.Row
          hx-get={next}
          hx-swap="outerHTML"
          hx-target="this"
          hx-trigger="revealed"
        />
      ) : null}
    </>
  );
}
