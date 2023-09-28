import { getBusinessesAsAdmin } from "@/services/business";
import { Button } from "@/ui/button";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import Table from "@/ui/table";
import { dict } from "@/utils/dictionary";

export const BusinessTable = async () => {
  const businesses = await getBusinessesAsAdmin();
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
        {businesses.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HCell>{dict.get("name")}</Table.HCell>
                <Table.HCell>{dict.get("owner")}</Table.HCell>
                <Table.HCell>{dict.get("enabled")}</Table.HCell>
                <Table.HCell>{dict.get("featured")}</Table.HCell>
                <Table.HCell>
                  <span class="sr-only">Edit</span>
                </Table.HCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {businesses.map((b) => (
                <Table.Row>
                  <Table.Cell>{b.name}</Table.Cell>
                  <Table.Cell>{b.owner}</Table.Cell>
                  <Table.Cell>{b.enabled}</Table.Cell>
                  <Table.Cell>{b.featured}</Table.Cell>
                  <Table.Cell>
                    <Button
                      hx-get={`/d/business/${b.id}`}
                      hx-push-url="true"
                      intent="ghost"
                      size="xs"
                    >
                      {dict.get("view")}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HCell colspan={5}>
                  <span class="mr-1 font-light">Total de registros: </span>
                  {businesses.length}
                </Table.HCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        ) : (
          <div class="py-20 text-center text-sm font-light text-gray-400">
            No se encontraron negocios
          </div>
        )}
      </DashboardContent>
    </div>
  );
};
