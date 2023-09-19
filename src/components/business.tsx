import { type InsertBusiness } from "@/db/schema/business";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { dict } from "@/utils/dictionary";
import { Tag } from "@/db/schema/tag";
import { InsertUser, User } from "@/db/schema/user";

const Business = ({ children }: { children: JSX.Element }) => (
  <div
    class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    hx-target="this"
  >
    <div>
      <h1 class="text-xl font-black leading-loose">Negocio</h1>
      <p class="mt-1 text-sm leading-6 text-gray-500">
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
    {children}
  </div>
);

Business.Table = ({ businesses }: { businesses: InsertBusiness[] }) => (
  <div class="-mx-4 mt-8 sm:-mx-0">
    <table class="min-w-full divide-y dark:divide-gray-700">
      <thead>
        <tr>
          {Object.keys(businesses[0]).map((header, i) =>
            !i ? null : (
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold capitalize first:table-cell sm:table-cell sm:pl-0"
              >
                {dict.get(header)}
              </th>
            ),
          )}
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y dark:divide-gray-700">
        {businesses.map((business) => (
          <tr>
            {Object.keys(businesses[0]).map((header, i) =>
              !i ? null : (
                <td class="hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm capitalize text-gray-500 first:table-cell first:font-medium first:text-gray-900 sm:table-cell sm:pl-0">
                  {business[header as keyof InsertBusiness]}
                </td>
              ),
            )}
            <td class="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
              <Button size="xs">
                {dict.get("view")}
                <span class="sr-only">, {business.name}</span>
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

Business.Form = ({
  tags,
  users,
}: {
  tags: Tag[];
  users: { id: number; name: string }[];
}) => (
  <div class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-4 lg:-mx-4 lg:max-w-none">
    <h1 class="text-xl font-black leading-loose">Nuevo negocio</h1>
    <p class="mb-4 mt-1 text-xs text-gray-500">Create a new business</p>
    <form
      hx-swap="none"
      hx-post="/d/business"
      hx-target-4xx="#notification"
      autocomplete="off"
    >
      <Input name="name" required="true" placeholder="Burguesía" />
      <Input name="description" placeholder="Las burgers más burgueses" />
      <Input
        name="phone"
        type="tel"
        pattern="[+549]{4}[0-9]{10}"
        title="Numero con prefijo (+549) seguido de 10 dígitos"
        placeholder="+5493435111111"
      />
      <Input name="location" placeholder="25 de Mayo y Sarmiento" />
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
        options={tags}
        multiple="true"
        placeholder="Hamburguesas"
      />
      <Input name="featured" type="checkbox" value="true" />
      <Input name="userId" options={users} placeholder="Jane Doe" />
      <span class="mt-2 flex justify-end">
        <Button intent="primary">{dict.get("save")}</Button>
      </span>
    </form>
  </div>
);

export default Business;
