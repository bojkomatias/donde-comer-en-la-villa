import { cx } from "@/utils/cx";

const Table = (props: JSX.HtmlTableTag) => (
  <table
    {...props}
    class={cx(
      "min-w-full divide-y-2 divide-border overflow-hidden shadow ring-1 ring-border sm:rounded-lg",
      props.class,
    )}
  >
    {props.children}
  </table>
);

Table.Head = (props: JSX.HtmlTableSectionTag) => (
  <thead {...props} class={cx("bg-accent", props.class)}>
    {props.children}
  </thead>
);

Table.Body = (props: JSX.HtmlTableSectionTag) => (
  <tbody {...props} class={cx("divide-y divide-border")}>
    {props.children}
  </tbody>
);

Table.Row = (props: JSX.HtmlTableRowTag) => (
  <tr {...props} class={cx("", props.class)}>
    {props.children}
  </tr>
);

Table.HCell = (props: JSX.HtmlTableHeaderCellTag) => (
  <th
    {...props}
    class={cx(
      "px-3 py-3 text-left text-sm font-semibold capitalize last-of-type:text-right sm:first-of-type:pl-6 sm:last-of-type:pr-6",
      props.class,
    )}
  >
    {props.children}
  </th>
);

Table.Cell = (props: JSX.HtmlTableHeaderCellTag) => (
  <td
    {...props}
    class={cx(
      "whitespace-nowrap px-3 py-2 text-sm capitalize text-muted-foreground first-of-type:pl-6 first-of-type:font-medium first-of-type:text-foreground last-of-type:text-right",
      props.class,
    )}
  >
    {props.children}
  </td>
);

export default Table;
