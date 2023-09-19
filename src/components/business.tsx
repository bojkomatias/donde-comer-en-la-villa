import { type InsertBusiness } from "@/db/schema/business";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { dict } from "@/utils/dictionary";

const Business = () => (
  <div
    className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    hx-target="this"
  >
    <div>
      <h1 className="text-xl font-black leading-loose">Negocio</h1>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Panel de administración de tu negocio. Si no tenes negocio, podes
        postular uno, y los administradores lo revisaran para aceptarlo.
      </p>
      <Button
        hx-get="/d/business/new"
        hx-swap="outerHTML"
        hx-push-url="true"
        intent="primary"
        size="sm"
        class="float-right"
      >
        Nuevo negocio
      </Button>
    </div>
    <Business.Table
      businesses={[
        {
          id: 1,
          name: "Sir Pane",
          featured: false,
          phone: "+5493455286829",
          location: "J.S. Bach 285",
        },
        {
          id: 2,
          name: "Lage Pizzas",
          featured: true,
          phone: "+5423124323",
          location: "Castelli 68",
        },
      ]}
    />
  </div>
);

Business.Table = ({ businesses }: { businesses: InsertBusiness[] }) => (
  <div className="-mx-4 mt-8 sm:-mx-0">
    <table className="min-w-full divide-y dark:divide-gray-700">
      <thead>
        <tr>
          {Object.keys(businesses[0]).map((header, i) =>
            !i ? null : (
              <th
                key={header}
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold capitalize first:table-cell sm:table-cell sm:pl-0"
              >
                {dict.get(header)}
              </th>
            ),
          )}
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y dark:divide-gray-700">
        {businesses.map((business) => (
          <tr key={business.id}>
            {Object.keys(businesses[0]).map((header, i) =>
              !i ? null : (
                <td className="hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm capitalize text-gray-500 first:table-cell first:font-medium first:text-gray-900 sm:table-cell sm:pl-0">
                  {business[header as keyof InsertBusiness]}
                </td>
              ),
            )}
            <td className="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
              <Button size="xs">
                {dict.get("view")}
                <span className="sr-only">, {business.name}</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {businesses.length === 0 && (
      <div class="py-20 text-center text-sm font-light text-gray-400">
        No se encontraron negocios
      </div>
    )}
  </div>
);

Business.Form = () => (
  <div className="mx-auto max-w-2xl rounded-lg bg-gray-50 p-4 lg:-mx-4 lg:max-w-none">
    <h1 className="text-xl font-black leading-loose">Nuevo negocio</h1>
    <p className="mb-4 mt-1 text-xs text-gray-500">Create a new business</p>
    <form hx-swap="none" hx-post="/business">
      <Input name="name" />
      <Input name="description" />
      <Input
        name="phone"
        type="tel"
        pattern="[+549]{4}[0-9]{10}"
        title="Numero con prefijo (+549) seguido de 10 dígitos"
        placeholder="+54934551111"
      />
      <Input name="location" />
      <Input
        name="socials"
        type="url"
        placeholder="https://www.instagram.com/sample/, https://www.instagram.com/sample2/"
      />
      <Input
        name="webpage"
        type="url"
        placeholder="https://www.matiasbojko.com"
      />
      <Input
        name="tags"
        options={[
          "Hamburguesas",
          "Pizzas",
          "Empanadas",
          "Helados",
          "Momento",
          "Facturas",
        ]}
        multiple="true"
      />
      <Input name="featured" />
      <Input
        name="owner"
        options={["Matias Bojko", "Nicolas Horn", "Amilcar Rey"]}
      />
      <span class="mt-2 flex justify-end">
        <Button intent="primary">Guardar</Button>
      </span>
    </form>
  </div>
);

export default Business;
