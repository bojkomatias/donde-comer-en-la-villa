import Elysia, { t } from "elysia";
import setup from "./(setup)";
import { Layout } from "@/ui/layout";
import { Filters } from "@/modules/marketing/filters";
import { getTags } from "@/services/tag";
import { Results } from "@/modules/marketing/results";
import { getBusinesses, getBusinessesQuery } from "@/services/business";
import Marketing from "@/modules/marketing/page";
import { getBusinessesByTag } from "@/services/tag-to-business";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/", async ({ JWTUser }) => {
    const tags = await getTags();
    return (
      <Layout isAuth={!!JWTUser}>
        <Marketing tags={tags} />
      </Layout>
    );
  })
  .post(
    "/search",
    async ({ body: { search } }) => {
      const businesses = await getBusinessesQuery(search);
      return (
        <pre class="text-xs font-thin">
          {JSON.stringify(businesses, null, 2)}
        </pre>
      );
      // return <Results businesses={businesses}/>;
    },
    { body: t.Object({ search: t.String() }) },
  );

export default marketing;
