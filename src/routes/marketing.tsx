import Elysia from "elysia";
import setup from "./(setup)";
import { Layout } from "@/ui/layout";
import { Filters } from "@/modules/marketing/filters";
import { getTags } from "@/services/tag";
import { Results } from "@/modules/marketing/results";
import { getBusinesses } from "@/services/business";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/", ({ JWTUser }) => <Layout isAuth={!!JWTUser} />)
  .get("/filters", async () => {
    const tags = await getTags();
    return <Filters tags={tags} />;
  })
  .get("/results", async () => {
    const businesses = await getBusinesses();
    console.log(businesses);
    return <Results />;
  });

export default marketing;
