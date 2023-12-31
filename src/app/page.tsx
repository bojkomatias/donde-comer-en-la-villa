import { getBusinessesQuery } from "@/services/business";
import { getTags } from "@/services/tag";
import Elysia, { t } from "elysia";
import MarketingTemplate from "./template";
import { SelectBusiness } from "@/db/schema/business";
import { SelectBusinessHours } from "@/db/schema/business-hours";
import { SelectTag } from "@/db/schema/tag";
import { ClearFilters, Filters } from "@/modules/marketing/filters";
import { OpenFilter } from "@/modules/marketing/open-filter";
import { Results } from "@/modules/marketing/results";
import { Search } from "@/modules/marketing/search";
import dashboard from "./dashboard/page";
import auth from "./auth/route";
import { button } from "@/ui/button";
import docs from "./docs/page";

const index = new Elysia({ name: "index-page" })
  .use(auth)
  .guard(
    {
      beforeHandle: ({ token, set }) => {
        if (!token) return (set.redirect = "/");
      },
    },
    (app) => app.use(dashboard),
  )
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
        .use(docs)
        .get("/", async () => {
          const tags = await getTags();
          const businesses = await getBusinessesQuery({
            today: "true",
          });

          return (
            <MarketingTemplate>
              <Page tags={tags} initialData={businesses} />
            </MarketingTemplate>
          );
        })
        .get(
          "/q",
          async ({ query, headers }) => {
            const tags = await getTags();
            const businesses = await getBusinessesQuery(query);

            return headers["hx-target"] ? (
              <>
                <ClearFilters tag={query.tag} />
                <Results businesses={businesses} />
              </>
            ) : (
              <>
                <MarketingTemplate>
                  {/* <ClearFilters tag={query.tag} /> */}
                  <Page tags={tags} initialData={businesses} />
                </MarketingTemplate>
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

// The page itself
const Page = ({
  tags,
  initialData,
}: {
  tags: SelectTag[];
  initialData: (SelectBusiness & {
    reviews: number | null;
    businessHours: SelectBusinessHours | null;
  })[];
}) => (
  <>
    <h1 class="mx-auto mt-12 max-w-xl select-none text-center font-heading text-2xl font-black leading-relaxed text-card-foreground sm:text-4xl">
      ¿Dónde comer en la villa?
    </h1>
    <h2 class="mx-auto max-w-xl py-4 text-center text-base font-light text-muted-foreground sm:text-lg">
      ¿Qué te gustaría comer?

    </h2>
    <div
      // _="init if cookies.ownerBadge is not equal to 'true' then add .flex remove .hidden end"
      class="mx-auto mt-2 flex w-fit items-center gap-2 rounded-lg bg-card p-3 text-center text-sm font-light text-card-foreground"
    >
      ¿Sos dueño o querés abrir tu local?
      <a
        href="/docs"
        hx-boost="true"
        class={button({ size: "sm", intent: "outline" })}
      >
        Empezá ahora
        <i class="i-lucide-arrow-right" />
      </a>
      <button
        _="on click hide my parentElement"
        class={button({
          size: "icon-xs",
          intent: "ghost",
        })}
      >
        <i class="i-lucide-x" />
      </button>
    </div>
    {/* <div class="mt-4 space-y-2 lg:grid lg:grid-cols-3 lg:space-y-0"> */}
    <div class="mx-1 mb-2 flex gap-2 pt-4 sm:mx-4">
      {/* Search bar */}
      <Search />
      {/* Open filter */}
      <OpenFilter />
    </div>
    {/* Tag filters */}
    <Filters tags={tags} />
    {/* </div> */}
    {/* List of businesses */}
    <Results businesses={initialData} />
  </>
);

export default index;
