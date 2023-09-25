import Elysia, { t } from "elysia";
import setup from "./(setup)";
import { Layout } from "@/ui/layout";
import { getTags } from "@/services/tag";
import { getBusinessesQuery, getInitialBusinesses } from "@/services/business";
import Marketing from "@/modules/marketing/page";
import { Results } from "@/modules/marketing/results";
import { getBusinessesByTag } from "@/services/tag-to-business";
import { cx } from "@/utils/cx";
import { Button } from "@/ui/button";

import Card from "@/ui/card";
import { Input } from "@/ui/input";
import Dropdown from "@/ui/dropdown";
import Table from "@/ui/table";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/btn", () => (
    <Layout>
      <div class="my-12" />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HCell class="transition">Name</Table.HCell>
            <Table.HCell>Last name</Table.HCell>
            <Table.HCell>Edit</Table.HCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Matías</Table.Cell>
            <Table.Cell>Bojko</Table.Cell>
            <Table.Cell>
              <Button intent="secondary" size="xs">
                Editar
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Layout>
  ))
  .guard(
    {
      // Cacheo todo para performance y preload
      beforeHandle: ({ set }) => {
        set.headers["Cache-Control"] = "public, max-age=900, must-revalidate";
      },
    },
    (app) =>
      app
        .get("/", async () => {
          const tags = await getTags();
          const initialB = await getInitialBusinesses();
          return (
            <Layout>
              <Marketing tags={tags} initialData={initialB} />
            </Layout>
          );
        })
        .get(
          "/filter",
          async ({ query: { tag } }) => {
            const businesses = tag
              ? await getBusinessesByTag(parseInt(tag))
              : await getInitialBusinesses();

            return (
              <>
                <div
                  id="clear-filters"
                  hx-get="/filter"
                  hx-target="#results"
                  hx-swap="outerHTML"
                  hx-swap-oob="true"
                  class={cx(
                    "mr-1 flex h-full cursor-pointer items-center justify-center rounded p-1.5 font-light text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700",
                    !tag && "hidden",
                  )}
                  _="on click send removeI to closest <div />"
                  title="Limpiar filtros"
                >
                  <i class="i-lucide-x h-3.5 w-3.5" />
                </div>

                <Results businesses={businesses} />
              </>
            );
          },
          {
            query: t.Object({ tag: t.Optional(t.String()) }),
          },
        )
        .get(
          "/search",
          async ({ query: { search } }) => {
            const businesses =
              search === ""
                ? await getInitialBusinesses()
                : await getBusinessesQuery(search);

            return <Results businesses={businesses} />;
          },
          {
            query: t.Object({ search: t.String() }),
          },
        ),
  );

export default marketing;
