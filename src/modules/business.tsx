import { SelectBusiness } from "@/db/schema/business";
import { SelectTag } from "@/db/schema/tag";
import { BusinessWithRelation, BusinessesWithUser } from "@/services/business";
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

    {children}
  </div>
);

Business.Table = ({ businesses }: { businesses: BusinessesWithUser }) => (
  <div class="mt-4">
    <div class="mb-2 flex justify-end pr-4 sm:pr-0">
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
          {businesses.map((business) => (
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
                {business?.owner}
              </td>
              <td class="flex justify-end whitespace-nowrap py-4 pl-3 pr-4 sm:pr-0">
                <Button
                  hx-get={`/d/business/${business.id}`}
                  hx-swap="outerHTML"
                  hx-push-url="true"
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

Business.New = ({
  tags,
  users,
}: {
  tags: SelectTag[];
  users: { id: number; name: string }[];
  business?: SelectBusiness;
}) => {
  return (
    <div hx-target="this">
      <Button
        size="xs"
        hx-get={`/d/business`}
        hx-target="#dashboard"
        hx-swap="outerHTML"
        hx-push-url="true"
        class="mb-2 ml-4 sm:ml-0"
      >
        <i class="i-lucide-chevron-left" />
        volver
      </Button>

      <DashboardHeading
        title={"Nuevo " + dict.get("business")}
        subtitle={"Crea un nuevo negocio"}
      />
      <form
        hx-post="/d/business"
        hx-swap="outerHTML"
        hx-push-url="true"
        hx-target-4xx="#notification"
        autocomplete="off"
        class="mx-2 py-4 sm:mx-0"
      >
        <Input name="name" required="true" placeholder="Burguesía" />
        <Input
          name="description"
          required="true"
          placeholder="Las burgers más burgueses de toda la burguesía"
        />
        <Input
          name="image"
          required="true"
          placeholder="https://scontent.cdninstagram.com/v/"
          title="Podes copiar tu imagen de Instagram"
        />
        <Input
          name="phone"
          required="true"
          type="tel"
          pattern="[+549]{4}[0-9]{10}"
          title="Formato de numero como Whatsapp"
          placeholder="+5493435111111"
        />
        <Input name="address" placeholder="25 de Mayo y Sarmiento" />
        <Input
          name="location"
          placeholder="https://maps.gl.io"
          type="url"
          title="Ubicación de google maps"
        />
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
        <Input name="tags" options={tags} multiple="true" required="true" />
        <span class="flex -space-x-px">
          <Input
            name="featured"
            type="checkbox"
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow first-of-type:rounded-t-none"
          />
          <Input
            name="enabled"
            type="checkbox"
            // HTML if not set value string sets "on" by default
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
};

Business.Edit = ({
  tags,
  users,
  business,
}: {
  tags: SelectTag[];
  users: { id: number; name: string }[];
  business: SelectBusiness;
}) => {
  return (
    <div hx-target="this">
      <Button
        size="xs"
        hx-get={`/d/business/${business.id}`}
        hx-swap="outerHTML"
        hx-push-url="true"
        class="mb-2 ml-4 sm:ml-0"
      >
        <i class="i-lucide-chevron-left" />
        volver
      </Button>

      <DashboardHeading
        title={"Editar " + dict.get("business")}
        subtitle="Actualiza los datos de tu negocio"
      />
      <form
        hx-put={`/d/business/${business.id}`}
        hx-swap="outerHTML"
        hx-push-url="true"
        hx-target-4xx="#notification"
        autocomplete="off"
        class="mx-2 py-4 sm:mx-0"
      >
        <Input
          name="name"
          required="true"
          placeholder="Burguesía"
          value={business.name}
        />
        <Input
          name="description"
          required="true"
          placeholder="Las burgers más burgueses"
          value={business.description || ""}
        />
        <Input
          name="image"
          required="true"
          placeholder="https://scontent.cdninstagram.com/v/"
          value={business.image || ""}
          title="Podes copiar tu imagen de Instagram"
        />
        <Input
          name="phone"
          required="true"
          type="tel"
          pattern="[+549]{4}[0-9]{10}"
          title="Formato de numero como Whatsapp"
          placeholder="+5493435111111"
          value={business.phone || ""}
        />
        <Input
          name="address"
          placeholder="25 de Mayo y Sarmiento"
          value={business.address || ""}
        />
        <Input
          name="location"
          placeholder="https://maps.gl.io"
          type="url"
          value={business.location || ""}
          title="Ubicación de google maps"
        />
        <span class="flex -space-x-px">
          <Input
            name="instagram"
            placeholder="matibojko"
            class="flex-grow first-of-type:rounded-t-none"
            value={business.instagram || ""}
          />
          <Input
            name="twitter"
            placeholder="bojko_matias"
            class="flex-grow last-of-type:rounded-b-none"
            value={business.twitter || ""}
          />
        </span>
        <Input
          name="webpage"
          type="url"
          placeholder="https://www.matiasbojko.com"
          value={business.webpage || ""}
        />
        <Input
          name="tags"
          required="true"
          options={tags}
          multiple="true"
          values={business.tags ? business.tags : undefined}
        />
        <span class="flex -space-x-px">
          <Input
            name="featured"
            type="checkbox"
            checked={business.featured ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow first-of-type:rounded-t-none"
          />
          <Input
            name="enabled"
            type="checkbox"
            checked={business.enabled ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow last-of-type:rounded-b-none"
          />
        </span>
        <Input
          name="owner"
          options={users}
          values={business.owner ? [business.owner] : undefined}
        />
        <span class="mt-2 flex justify-end">
          <Button intent="primary">{dict.get("save")}</Button>
        </span>
      </form>
    </div>
  );
};

Business.View = ({ business }: { business: BusinessWithRelation }) => {
  return (
    <div hx-target="this">
      <Button
        size="xs"
        hx-get="/d/business"
        hx-target="#dashboard"
        hx-swap="outerHTML"
        hx-push-url="true"
        class="ml-4 sm:ml-0"
      >
        <i class="i-lucide-chevron-left" />
        volver
      </Button>
      <div class="flex justify-end pr-4">
        <Button
          hx-get={`/d/business/${business.id}/edit`}
          hx-push-url="true"
          intent="primary"
          size="sm"
          preload
        >
          Editar
        </Button>
      </div>

      <div class="flex items-center gap-4">
        <img
          src={business.image ? business.image : undefined}
          width="50"
          height="50"
          alt="Imagen del local"
          class="h-20 w-20 rounded-full p-2"
        />
        <div class="flex-grow">
          <DashboardHeading
            title={business.name}
            subtitle={business.description || ""}
          />
        </div>
      </div>
      {/* Created , Updated */}
      <div class="mt-2 px-4 text-xs font-light text-gray-500">
        <div class="first-letter:capitalize">
          <span class="font-medium">{dict.get("createdAt")}: </span>
          {business.createdAt}
        </div>
        <div class="first-letter:capitalize">
          <span class="font-medium">{dict.get("updatedAt")}: </span>
          {business.updatedAt}
        </div>
      </div>
      {/* Tabular data */}
      <div class="grid grid-cols-2 gap-x-20 gap-y-6 py-4 pl-4 pr-8 text-sm sm:grid-cols-4 sm:pr-4">
        <div class="font-medium first-letter:capitalize">
          {dict.get("phone")}
        </div>
        <div class="place-self-end overflow-hidden">{business.phone}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("instagram")}
        </div>
        <div class="place-self-end overflow-hidden">{business.instagram}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("twitter")}
        </div>
        <div class="place-self-end overflow-hidden">{business.twitter}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("webpage")}
        </div>
        <div class="place-self-end overflow-hidden">{business.webpage}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("address")}
        </div>
        <div class="place-self-end overflow-hidden">{business.address}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("location")}
        </div>
        <div class="place-self-end overflow-hidden">{business.location}</div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("featured")}
        </div>
        <div class="place-self-end overflow-hidden">
          {business.featured ? (
            <i class="i-lucide-check h-6 w-4" />
          ) : (
            <i class="i-lucide-x h-6 w-4" />
          )}
        </div>

        <div class="font-medium first-letter:capitalize">
          {dict.get("enabled")}
        </div>
        <div class="place-self-end overflow-hidden">
          {business.enabled ? (
            <i class="i-lucide-check h-6 w-4" />
          ) : (
            <i class="i-lucide-x h-6 w-4" />
          )}
        </div>
      </div>
      {/* Categories */}
      <div class="px-4 sm:flex sm:gap-2">
        <div class="text-sm font-medium first-letter:capitalize">
          {dict.get("tags")}:
        </div>
        <div class="pl-px text-sm font-light capitalize">
          {business.tags.join(" - ")}
        </div>
      </div>
    </div>
  );
};

export default Business;
