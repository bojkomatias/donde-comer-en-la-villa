import { Layout } from "../components/layout";
import { Button } from "../components/ui/button";
import { tag } from "../db/schema/tags";
import { Setup } from "./setup";

export const mainPlugin = (app: Setup) =>
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
                intent="outline"
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

const LandingPage = () => (
  <>
    <h2 class="text-center text-4xl font-semibold">
      Donde pingo se puede comer!!
    </h2>
    <p class="mb-12 text-center text-lg font-light italic">
      Estas cagado de hambre y no sabes donde mierda buscar? Llegaste al lugar
      correcto.
    </p>
    <div hx-get="/tags" hx-swap="outerHTML" hx-trigger="load" />
    <div id="businesses" />
  </>
);
