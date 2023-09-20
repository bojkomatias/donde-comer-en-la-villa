import { SelectBusiness } from "@/db/schema/business";
import { SelectTag } from "@/db/schema/tag";
import { SelectUser } from "@/db/schema/user";
import { Button } from "@/ui/button";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { Input } from "@/ui/input";
import { dict } from "@/utils/dictionary";

const Business = ({ children }: { children: JSX.Element }) => (
  <div hx-target="this">
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

Business.Table = ({
  businesses,
}: {
  businesses: { business: SelectBusiness; user: SelectUser | null }[];
}) => (
  <div class="mt-8">
    {businesses.length > 0 ? (
      <table class="min-w-full divide-y dark:divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              class="table-cell px-3 py-3.5 text-left text-sm font-semibold capitalize sm:pl-0"
            >
              {dict.get("name")}
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold capitalize sm:table-cell"
            >
              {dict.get("phone")}
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold capitalize sm:table-cell"
            >
              {dict.get("enabled")}
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold capitalize sm:table-cell"
            >
              {dict.get("owner")}
            </th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span class="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y dark:divide-gray-700">
          {businesses.map(({ business, user }) => (
            <tr>
              <td
                class="table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium capitalize text-inherit sm:pl-0"
                safe
              >
                {business.name}
              </td>
              <td
                class="hidden whitespace-nowrap px-2 py-4 text-sm capitalize text-gray-500 sm:table-cell"
                safe
              >
                {business.phone}
              </td>
              <td
                class="hidden whitespace-nowrap px-2 py-4 text-sm capitalize text-gray-500 sm:table-cell"
                safe
              >
                {business.enabled}
              </td>
              <td
                class="hidden whitespace-nowrap px-2 py-4 text-sm capitalize text-gray-500 sm:table-cell"
                safe
              >
                {user?.name}
              </td>
              <td class="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
                <Button
                  hx-get={`/d/business/${business.id}/edit`}
                  hx-swap="outerHTML"
                  size="xs"
                  preload
                >
                  {dict.get("view")}
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
  business,
}: {
  tags: SelectTag[];
  users: { id: number; name: string }[];
  business?: SelectBusiness;
}) => {
  return (
    <div
      hx-target="this"
      class="bg-gray-50 p-4 dark:bg-gray-900/50 sm:rounded-lg"
    >
      <DashboardHeading
        title={(business ? "Editar " : "Nuevo ") + dict.get("business")}
        subtitle={
          business
            ? "Actualiza los datos de tu negocio"
            : "Crea un nuevo negocio"
        }
      />
      <form
        hx-post="/d/business"
        hx-swap="outerHTML"
        hx-push-url="true"
        hx-target-4xx="#notification"
        autocomplete="off"
        class="-mx-1 mt-4 sm:mx-0"
      >
        <Input
          name="name"
          required="true"
          placeholder="Burguesía"
          value={business?.name}
        />
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
        <Input
          name="tags"
          options={tags}
          multiple="true"
          values={business?.tags ? business.tags : undefined}
        />
        <span class="flex -space-x-px">
          <Input
            name="featured"
            type="checkbox"
            checked={business?.featured ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow first-of-type:rounded-t-none"
          />
          <Input
            name="enabled"
            type="checkbox"
            checked={business?.enabled ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow last-of-type:rounded-b-none"
          />
        </span>
        <Input
          name="owner"
          options={users}
          values={business?.owner ? [business.owner] : undefined}
        />
        <span class="mt-2 flex justify-end">
          <Button intent="primary">{dict.get("save")}</Button>
        </span>
      </form>
    </div>
  );
};

export default Business;
