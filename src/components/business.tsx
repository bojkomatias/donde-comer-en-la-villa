import { type InsertBusiness } from "@/db/schema/business";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { dict } from "@/utils/dictionary";
import { Tag } from "@/db/schema/tag";
import { DashboardHeading } from "./dashboard/heading";

const Business = ({ children }: { children: JSX.Element }) => (
  <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none" hx-target="this">
    <DashboardHeading
      title={dict.get("business")}
      subtitle="Panel de administración de tu negocio. Si no tenes negocio, podes postular
        uno, y los administradores lo revisaran para aceptarlo."
    />

    <div class="mt-4 flex justify-end">
      <Button
        hx-get="/d/business/new"
        hx-swap="outerHTML"
        hx-push-url="true"
        intent="primary"
        size="sm"
      >
        Nuevo negocio
      </Button>
    </div>
    {children}
  </div>
);

Business.Table = ({ businesses }: { businesses: InsertBusiness[] }) => (
  <div class="mt-8">
    {businesses.length > 0 ? (
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
    ) : (
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
  <div class="bg-gray-50 p-2 dark:bg-gray-900 sm:rounded-lg lg:p-4">
    <DashboardHeading
      title={"Nuevo " + dict.get("business")}
      subtitle="Crea un nuevo negocio"
    />
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
      <Input name="address" placeholder="25 de Mayo y Sarmiento" />
      <Input name="location" placeholder="https://maps.gl.io" type="url" />
      <span class="flex -space-x-px">
        <Input
          name="instagram"
          placeholder="matibojko"
          class="flex-grow first-of-type:rounded-t-none"
        />
        <Input
          name="twitter"
          placeholder="bojko_matias"
          class="flex-grow last-of-type:rounded-b-none"
        />
      </span>
      <Input
        name="webpage"
        type="url"
        placeholder="https://www.matiasbojko.com"
      />
      <Input name="tags" options={tags} multiple="true" />
      <span class="flex -space-x-px">
        <Input
          name="featured"
          type="checkbox"
          value="true"
          class="flex-grow first-of-type:rounded-t-none"
        />
        <Input
          name="enabled"
          type="checkbox"
          value="true"
          class="flex-grow last-of-type:rounded-b-none"
        />
      </span>
      <Input name="owner" options={users} />
      <span class="mt-2 flex justify-end">
        <Button intent="primary">{dict.get("save")}</Button>
      </span>
    </form>
  </div>
);

export default Business;
