import { cx } from "@/utils/cx";
import Table from "./table";
import Dropdown from "./dropdown";

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
  hidden?: string;
  col?: string;
};

/**
 * Used to pass the allowed actions through props only  (injected in component)
 * @T Generic type (equivalent to row.original)
 */
export type Action<T> = (r: T) => JSX.HtmlTag;

export function DataTable<T>({
  children,
  columns,
}: {
  children: any;
  columns: Column<T>[];
}) {
  return (
    <div>
      <div class="mb-2 flex justify-end">
        <Dropdown>
          <Dropdown.Trigger intent="outline" size="icon">
            <i class="i-lucide-table-properties" />
          </Dropdown.Trigger>
          <Dropdown.Content class="w-40">
            {columns
              .filter((e) => !e.disableHiding)
              .map(({ accessor, header, hidden }) => (
                <Dropdown.Item
                  _={`on click tell #${String(
                    accessor,
                  )} in next <colgroup/> toggle .hidden end
                  on click tell .${String(
                    accessor,
                  )} in next <table/> toggle .hidden end
                    on click toggle .hidden on <i/> in me`}
                  class="text-xs"
                >
                  <span>{header}</span>
                  <i class={cx("i-lucide-check", hidden)} />
                </Dropdown.Item>
              ))}
          </Dropdown.Content>
        </Dropdown>
      </div>
      <Table>
        <colgroup>
          {columns.map(({ col, accessor, hidden }) => (
            <col id={String(accessor)} class={cx(col, hidden)} />
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
    </div>
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
  next?: number;
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
            <Dropdown>
              <Dropdown.Trigger>
                <i class="i-lucide-more-horizontal" />
              </Dropdown.Trigger>
              <Dropdown.Content class="flex w-32 flex-col">
                {actions.map((action) => (
                  <Dropdown.Item {...action(d)} />
                ))}
              </Dropdown.Content>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      ))}
      {next ? (
        <Table.Row
          hx-get={`/data?page=${next}`}
          hx-swap="outerHTML"
          hx-target="this"
          hx-trigger="revealed"
        />
      ) : null}
    </>
  );
}
