import Elysia, { t } from "elysia";
import setup from "./(setup)";
import { Layout } from "@/ui/layout";
import { getTags } from "@/services/tag";
import { getBusinessesQuery, getInitialBusinesses } from "@/services/business";
import Marketing from "@/modules/marketing/page";
import { Results } from "@/modules/marketing/results";
import { getBusinessesByTag } from "@/services/tag-to-business";
import { Button } from "@/ui/button";
import { cx } from "@/utils/cx";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/", async ({ JWTUser }) => {
    const tags = await getTags();
    const initialB = await getInitialBusinesses();
    return (
      <Layout isAuth={!!JWTUser}>
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
          <Button
            id="clear-filters"
            hx-get="/filter"
            hx-target="#results"
            hx-swap="outerHTML"
            hx-swap-oob="true"
            size="xs"
            class={cx("mr-1 h-full font-light text-gray-500", !tag && "hidden")}
            _="on click send removeI to closest <div />"
            title="Limpiar filtros"
          >
            <i class="i-lucide-x h-3.5 w-3.5" />
          </Button>

          <Results businesses={businesses} />
        </>
      );
    },
    { query: t.Object({ tag: t.Optional(t.String()) }) },
  )
  .post(
    "/search",
    async ({ body: { search } }) => {
      const businesses =
        search === ""
          ? await getInitialBusinesses()
          : await getBusinessesQuery(search);

      return <Results businesses={businesses} />;
    },
    { body: t.Object({ search: t.String() }) },
  );

export default marketing;
