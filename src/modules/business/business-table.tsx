import { SelectBusiness } from "@/db/schema/business";
import { Button } from "@/ui/button";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { DataRows, DataTable } from "@/ui/data-table/data-table";
import { Action, Column, pageLimit } from "@/ui/data-table/utils";
import { dict } from "@/utils/dictionary";

type DataType = SelectBusiness & { ownerName: string | null };

const columns: Column<DataType>[] = [
  {
    accessor: "id",
    hidden: true,
  },
  {
    accessor: "createdAt",
    sortable: true,
    hidden: true,
  },
  {
    accessor: "updatedAt",
    sortable: true,
  },
  {
    accessor: "name",
    sortable: true,
    disableHiding: true,
  },
  {
    accessor: "phone",
    hidden: true,
  },
  {
    accessor: "address",
    hidden: true,
  },
  {
    accessor: "instagram",
    hidden: true,
  },
  {
    accessor: "ownerName",
  },
  {
    accessor: "enabled",
    cell: ({ enabled }) => (
      <div class="flex justify-center">
        {enabled ? <i class="i-lucide-check text-center" /> : "-"}
      </div>
    ),
    disableHiding: true,
  },
  {
    accessor: "featured",
    cell: ({ featured }) => (
      <div class="flex justify-center">
        {featured ? <i class="i-lucide-check text-center" /> : "-"}
      </div>
    ),
    disableHiding: true,
  },
];

const actions: Action<DataType>[] = [
  ({ id }) => ({
    children: (
      <>
        {dict.get("view")} <i class="i-lucide-file-text" />
      </>
    ),
    "hx-get": `/d/business/${id}`,
    "hx-push-url": "true",
  }),
  ({ id }) => ({
    children: (
      <>
        {dict.get("bHours")} <i class="i-lucide-file-clock" />
      </>
    ),
    "hx-get": `/d/business/${id}/hours`,
    "hx-push-url": "true",
  }),
  ({ id }) => ({
    children: (
      <>
        {dict.get("edit")} <i class="i-lucide-file-edit" />
      </>
    ),
    "hx-get": `/d/business/${id}/edit`,
    "hx-push-url": "true",
  }),
];

export const BusinessTable = ({ children }: { children: any }) => {
  return (
    <div hx-target="this">
      <DashboardHeading
        title={dict.get("businesses")}
        action={
          <Button
            hx-get="/d/business/new"
            hx-swap="outerHTML"
            hx-push-url="true"
            intent="primary"
            size="sm"
          >
            Nuevo negocio
          </Button>
        }
      />
      <DashboardContent>
        <DataTable
          columns={columns}
          search={{
            id: "search-businesses",
            name: "search",
            "hx-get": "/d/business/q",
            key: "k",
          }}
        >
          {children}
        </DataTable>
      </DashboardContent>
    </div>
  );
};

export const BusinessRows = ({
  businesses,
  next,
}: {
  businesses: DataType[];
  next: string;
}) => (
  <DataRows
    columns={columns}
    data={businesses}
    next={businesses.length < pageLimit ? undefined : next}
    actions={actions}
  />
);
