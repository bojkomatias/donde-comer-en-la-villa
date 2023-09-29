import { SelectUser } from "@/db/schema/user";
import { Badge } from "@/ui/badge";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Action, Column, DataRows, DataTable } from "@/ui/data-table";
import { dict } from "@/utils/dictionary";

const columns: Column<Omit<SelectUser, "password">>[] = [
  {
    accessor: "id",
    header: dict.get("id"),
    col: "w-12",
  },
  {
    accessor: "createdAt",
    header: dict.get("createdAt"),
    hidden: true,
  },
  {
    accessor: "name",
    header: dict.get("name"),
    col: "w-1/3",
    disableHiding: true,
  },
  {
    accessor: "email",
    header: dict.get("email"),
    col: "w-1/3",
  },
  {
    accessor: "role",
    header: dict.get("role"),
    cell: ({ role }) => <Badge>{role}</Badge>,
    disableHiding: true,
  },
  {
    accessor: "image",
    header: dict.get("image"),
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
            "hx-get": "/d/users/search",
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
    next={users.length < 10 ? undefined : next}
    actions={actions}
  />
);
