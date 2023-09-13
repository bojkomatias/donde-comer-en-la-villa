import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { tag } from "@/db/schema/tags";
import { Setup } from "@/setup";
import { LandingPage } from "./page";

const main = (app: Setup) =>
  app
    .get("/", ({ user }) => (
      <Layout title="Donde comer?" isAuth={!!user}>
        <LandingPage />
      </Layout>
    ))
    .get("/tags", async ({ store: { db } }) => {
      const tags = await db.select().from(tag);
      return (
        <ul class="flex gap-2">
          {tags.map((t) => (
            <li>
              <Button
                intent="secondary"
                hx-get={`/business?tag=${t.id}`}
                hx-target="#businesses"
                hx-swap="innerHTML"
              >
                {t.name}
              </Button>
            </li>
          ))}
        </ul>
      );
    })
    .get("/business", ({ query: { tag } }) => {
      return <div>Businesses with tag: {tag}</div>;
    });

export default main;
