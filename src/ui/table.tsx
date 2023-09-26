import { cx } from "@/utils/cx";

const Table = (props: JSX.HtmlTableTag) => (
  <div {...props} class={cx("flow-root overflow-x-auto", props.class)}>
    <table class="table min-w-full table-fixed">{props.children}</table>
  </div>
);

Table.Head = (props: JSX.HtmlTableSectionTag) => (
  <thead
    {...props}
    class={cx(
      "relative table table-fixed after:absolute after:inset-0.5 after:-z-10 after:rounded-xl after:bg-accent/40 after:ring-1 after:ring-border",
      props.class,
    )}
  >
    {props.children}
  </thead>
);

Table.Body = (props: JSX.HtmlTableSectionTag) => (
  <tbody
    {...props}
    class={cx(
      "block max-h-96 divide-y divide-border overflow-y-auto",
      props.class,
    )}
  >
    {props.children}
  </tbody>
);

Table.Row = (props: JSX.HtmlTableRowTag) => (
  <tr {...props} class={cx("table w-full table-fixed", props.class)}>
    {props.children}
  </tr>
);

Table.HCell = (props: JSX.HtmlTableHeaderCellTag) => (
  <th
    {...props}
    class={cx(
      "px-3 py-3 text-left text-xs font-semibold last:text-right sm:first:pl-6 sm:last:pr-6",
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
      "whitespace-nowrap px-3 py-2 text-sm text-muted-foreground first-of-type:pl-6 first-of-type:font-medium first-of-type:text-foreground last-of-type:text-right",
      props.class,
    )}
  >
    {props.children}
  </td>
);

Table.Footer = (props: JSX.HtmlTableSectionTag) => (
  <thead
    {...props}
    class={cx(
      "relative table table-fixed after:absolute after:inset-0.5 after:-z-10 after:rounded-xl after:bg-accent/40 after:ring-1 after:ring-border",
      props.class,
    )}
  >
    {props.children}
  </thead>
);

export default Table;
