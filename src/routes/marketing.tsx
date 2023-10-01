import Elysia, { t } from "elysia";
import setup from "./(setup)";
import { getTags } from "@/services/tag";
import { getBusinessesQuery, getInitialBusinesses } from "@/services/business";
import Marketing from "@/modules/marketing/page";
import { Results } from "@/modules/marketing/results";
import { getBusinessesByTag } from "@/services/tag-to-business";
import { cx } from "@/utils/cx";
import { MarketingLayout } from "@/ui/marketing/layout";
import { BusinessHours } from "@/modules/business/business-hours";

const marketing = new Elysia({
  name: "marketing",
})
  .use(setup)
  .get("/data", () => (
    <MarketingLayout>
      <div class="mx-auto mt-20 max-w-5xl">
        <BusinessHours businessId={1} />
      </div>
    </MarketingLayout>
  ))
  .guard(
    {
      beforeHandle: ({ set }) => {
        /** Uncomment the following if this plugins starts pushing-urls */
        // set.headers['Vary'] = 'hx-request'
        set.headers["Cache-Control"] =
          "public, max-age=900, must-revalidate, stale-while-revalidate=120";
      },
    },
    (app) =>
      app
        .get("/", async () => {
          const tags = await getTags();
          const initialB = await getInitialBusinesses();

          console.log(initialB);
          return (
            <MarketingLayout>
              <Marketing tags={tags} initialData={initialB} />
            </MarketingLayout>
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
