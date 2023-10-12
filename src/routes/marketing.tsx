import Elysia, { t } from "elysia";
import setup from "./(setup)";
import { getTags } from "@/services/tag";
import { getBusinessesQuery } from "@/services/business";
import Marketing from "@/modules/marketing/page";
import { Results } from "@/modules/marketing/results";
import { MarketingLayout } from "@/ui/marketing/layout";
import { ClearFilters } from "@/modules/marketing/filters";
import { Notification } from "@/ui/notification";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/n", () => (
    <Notification title="SAPE" description="Lorem sape sape sape sape sape" />
  ))
  .guard(
    {
      beforeHandle: ({ set }) => {
        /** Uncomment the following if this plugins starts pushing-urls */
        set.headers["Vary"] = "hx-request";
        set.headers["Cache-Control"] =
          "public, max-age=900, must-revalidate, stale-while-revalidate=120";
      },
    },
    (app) =>
      app
        .get("/", async () => {
          const tags = await getTags();
          const initialB = await getBusinessesQuery({ today: "true" });

          return (
            <MarketingLayout>
              <Marketing tags={tags} initialData={initialB} />
              <button hx-get="/n" hx-swap="none">
                Nofify me
              </button>{" "}
              <button _="on click log window.location">Log</button>
            </MarketingLayout>
          );
        })

        .get(
          "/q",
          async ({ query }) => {
            console.log(query);
            const businesses = await getBusinessesQuery(query);

            return (
              <>
                <ClearFilters tag={query.tag} />
                <Results businesses={businesses} />
              </>
            );
          },
          {
            query: t.Object({
              search: t.Optional(t.String()),
              tag: t.Optional(t.Numeric()),
              open: t.Optional(t.Literal("true")),
              today: t.Optional(t.Literal("true")),
            }),
          },
        ),
  );

export default marketing;
