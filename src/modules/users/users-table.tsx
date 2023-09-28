import { SelectUser } from "@/db/schema/user";
import { Badge } from "@/ui/badge";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Column, DataTable } from "@/ui/data-table";
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
    initialHidden: true,
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
    initialHidden: true,
  },
];

export const UsersTable = ({
  users,
}: {
  users: Omit<SelectUser, "password">[];
}) => {
  return (
    <div hx-target="this">
      <DashboardHeading title={dict.get("users")} />
      <DashboardContent>
        <DataTable columns={columns} data={users} />
      </DashboardContent>
    </div>
  );
};
