import { Elysia, t } from "elysia";
import { Business, businesses } from "../db/schema/business";
import { db } from "../db";
import { eq } from "drizzle-orm";

const business = new Elysia({ prefix: "/business" })
  .get("/", async () => {
    const r = await db.select().from(businesses);

    return <BusinessList businesses={r} />;
  })
  .get("/:id", async ({ params }) => {
    const r = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, Number(params.id)));

    if (!r.length) return <div>Not found!</div>;

    return <BusinessItem business={r[0]} />;
  })
  .get("/:id/edit", async ({ params }) => {
    const r = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, Number(params.id)));

    return <BusinessEdit business={r[0]} />;
  })
  .guard(
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
        phone: t.String(),
      }),
    },
    (app) =>
      app
        .put("/:id", async ({ params, body }) => {
          await db
            .update(businesses)
            .set(body)
            .where(eq(businesses.id, Number(params.id)));
          /**
         .returning() is not working in sqlite 
         So i have to make extra query to return!
         *  */
          const r = await db
            .select()
            .from(businesses)
            .where(eq(businesses.id, Number(params.id)));

          return <BusinessItem business={r[0]} />;
        })
        .post("/", async ({ set, body }) => {
          await db.insert(businesses).values(body);
          // Lo ideal seria devolver 1 solo e insertarlo, pero hasta que no arreglen .returning() no pasa naranja
          set.redirect = "/business";
        })
  );

export default business;

////
// JSX Components + htmx tags
////
const BusinessList = ({ businesses }: { businesses: Business[] }) => (
  // I replace the whole list!
  <div hx-target="this">
    <p class="text-lg">Crea un nuevo local</p>
    <BusinessCreate />
    <p class="text-xl"> Lista de locales</p>
    <ul role="list" class="divide-y divide-gray-100 max-w-6xl mx-auto">
      {businesses.map((business) => (
        <BusinessItem business={business} />
      ))}
    </ul>
  </div>
);

const BusinessItem = ({ business }: { business: Business }) => (
  <li
    class="flex justify-between gap-x-6 py-5"
    hx-target="this"
    hx-swap="outerHTML"
  >
    <div class="min-w-0 flex-auto">
      <p class="text-xl font-semibold leading-6 text-gray-900">
        <a href="#" class="hover:underline">
          {business.name}
        </a>
      </p>
      <p class="text-sm text-gray-600 font-light">{business.description}</p>
      <p class="mt-1 flex text-xs leading-5 text-gray-600">
        Teléfono:
        <a href={`tel:${business.phone}`} class="truncate hover:underline">
          {business.phone}
        </a>
      </p>
    </div>

    <div class="flex shrink-0 items-center gap-x-6">
      <div class="hidden sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
        </p>
      </div>
      <button hx-get={`/business/${business.id}/edit`}> Edit! </button>
      {/* <div class="relative flex-none">
          <button
            type="button"
            class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
            id="options-menu-0-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span class="sr-only">Open options</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
          </button>

          <div
            class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu-0-button"
            tabindex="-1"
          >
            <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="options-menu-0-item-0"
            >
              View profile<span class="sr-only">, Leslie Alexander</span>
            </a>
            <a
              href="#"
              class="block px-3 py-1 text-sm leading-6 text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="options-menu-0-item-1"
            >
              Message<span class="sr-only">, Leslie Alexander</span>
            </a>
          </div>
        </div> */}
    </div>
  </li>
);

const BusinessEdit = ({ business }: { business: Business }) => (
  <form
    hx-put={`/business/${business.id}`}
    hx-target="this"
    hx-swap="outerHTML"
    class="flex justify-between gap-x-6 py-5"
  >
    <div class="min-w-0 flex-auto">
      <input type="text" name="name" value={business.name ?? ""} />
      <p class="text-sm text-gray-600 font-light">
        <input
          type="text"
          name="description"
          value={business.description ?? ""}
        />
      </p>
      <p class="mt-1 flex text-xs leading-5 text-gray-600">
        Teléfono:
        <input type="text" name="phone" value={business.phone ?? ""} />
      </p>
    </div>
    <div>
      <button>Submit</button>
      <button hx-get={`/business/${business.id}`}>Cancel</button>
    </div>
  </form>
);

const BusinessCreate = () => (
  <form hx-post="/business">
    <div class="min-w-0 flex-auto">
      <label htmlFor="name"> Nombre </label>
      <input type="text" name="name" />
      <label htmlFor="name"> Descripcion </label>

      <input type="text" name="description" />

      <label htmlFor="name"> Tel </label>

      <input type="text" name="phone" />
    </div>
    <button>Crear</button>
  </form>
);
