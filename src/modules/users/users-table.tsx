import { SelectUser } from "@/db/schema/user";
import { Badge } from "@/ui/badge";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { DataRows, DataTable } from "@/ui/data-table/data-table";
import { Action, Column, pageLimit } from "@/ui/data-table/utils";
import { dict } from "@/utils/dictionary";

const columns: Column<Omit<SelectUser, "password">>[] = [
  {
    accessor: "id",
    col: "w-12",
  },
  {
    accessor: "createdAt",
    hidden: true,
  },
  {
    accessor: "name",
    col: "w-1/3",
    disableHiding: true,
    sortable: true,
  },
  {
    accessor: "email",
    col: "w-1/3",
  },
  {
    accessor: "role",
    cell: ({ role }) => <Badge>{role}</Badge>,
    disableHiding: true,
    sortable: true,
  },
  {
    accessor: "image",
    hidden: true,
  },
];
const actions: Action<Omit<SelectUser, "password">>[] = [];

export const UsersTable = ({ children }: { children: any }) => {
  return (
    <div hx-target="this">
      <DashboardHeading title={dict.get("users")} />
      <DashboardContent>
        <DataTable
          columns={columns}
          search={{
            id: "search-users",
            name: "search",
            "hx-get": "/d/users/q",
            key: "k",
          }}
        >
          {children}
        </DataTable>
      </DashboardContent>
    </div>
  );
};

export const UserRows = ({
  users,
  next,
}: {
  users: Omit<SelectUser, "password">[];
  next: string;
}) => (
  <DataRows
    columns={columns}
    data={users}
    next={users.length < pageLimit ? undefined : next}
    actions={actions}
  />
);
