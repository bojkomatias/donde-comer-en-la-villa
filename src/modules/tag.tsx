import { InsertTag, SelectTag } from "@/db/schema/tag";
import { Button } from "@/ui/button";
import Card from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Input } from "@/ui/input";
import Table from "@/ui/table";
import { dict } from "@/utils/dictionary";

const Tags = ({ tags }: { tags: SelectTag[] }) => (
  <>
    <DashboardHeading title={dict.get("tags")} />
    <DashboardContent>
      <Tags.New />
      <div class="mt-16">
        {tags.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HCell>{dict.get("id")}</Table.HCell>
                <Table.HCell>{dict.get("name")}</Table.HCell>
                <Table.HCell>
                  <span class="sr-only">Edit</span>
                </Table.HCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tags.map((tag) => (
                <Tags.Row tag={tag} />
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HCell colspan={3}>
                  <span class="mr-1 font-light">Total de registros: </span>
                  {tags.length}
                </Table.HCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        ) : (
          <div class="py-20 text-center text-sm font-light text-gray-400">
            No se encontraron categorías
          </div>
        )}
      </div>
    </DashboardContent>
  </>
);

Tags.Row = ({ tag }: { tag: SelectTag }) => {
  return (
    <Table.Row>
      <Table.Cell safe>{tag.id}</Table.Cell>
      <Table.Cell safe class="font-semibold capitalize">
        {tag.name}
      </Table.Cell>
      <Table.Cell>
        <Button
          hx-get={`/d/tag/${tag.id}/form`}
          hx-target="closest tr"
          hx-swap="outerHTML"
          size="xs"
        >
          {dict.get("edit")}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

Tags.Edit = ({ tag }: { tag: InsertTag }) => {
  return (
    <Table.Row hx-target="this">
      <Table.Cell safe>{tag.id}</Table.Cell>
      <Table.Cell>
        <Input
          type="text"
          name="name"
          placeholder="Panificados"
          value={tag.name}
          required="true"
          rt
          rb
        />
      </Table.Cell>
      <Table.Cell class="space-x-2">
        <Button
          intent="primary"
          size="xs"
          hx-put={`/d/tag/${tag.id}`}
          hx-include="closest tr"
          hx-swap="outerHTML"
          hx-target-403="#row-error"
        >
          {dict.get("save")}
        </Button>
        <Button
          type="button"
          intent="secondary"
          size="xs"
          hx-get={`/d/tag/${tag.id}/row`}
          hx-swap="outerHTML"
        >
          {dict.get("cancel")}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

Tags.New = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{"Nueva " + dict.get("tag")}</Card.Title>
        <Card.Description>
          Agrega más categorías a la colección
        </Card.Description>
      </Card.Header>
      <form
        hx-post="/d/tag"
        hx-target="#tag-results"
        hx-swap="afterend"
        hx-target-4xx="#notification"
        _="on htmx:afterRequest reset() me"
      >
        <Card.Content>
          <Input
            type="text"
            name="name"
            placeholder="Pizzas a la piedra"
            required="true"
            rt
            rb
          />
        </Card.Content>
        <Card.Footer class="justify-end">
          <Button intent="primary" size="sm">
            {dict.get("save")}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
};

export default Tags;
