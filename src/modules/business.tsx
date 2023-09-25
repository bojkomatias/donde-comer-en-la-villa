import { SelectBusiness } from "@/db/schema/business";
import { SelectTag } from "@/db/schema/tag";
import { BusinessWithOwner } from "@/services/business";
import { Button } from "@/ui/button";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { Input } from "@/ui/input";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

const Business = ({ children }: { children: JSX.Element }) => (
  <div hx-target="this">
    <DashboardHeading
      title={dict.get("businesses")}
      subtitle="Panel de administrador de los negocios de la aplicación. Lista de todos los negocios y sus dueños."
    />

    {children}
  </div>
);

Business.Table = ({ businesses }: { businesses: BusinessWithOwner[] }) => (
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
                {business.owner?.name}
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
  asAdmin,
  ownerId,
}: {
  tags: SelectTag[];
  users: { id: number; name: string }[];
  asAdmin?: boolean;
  ownerId?: number;
}) => {
  return (
    <div hx-target="this">
      <Button size="xs" _="on click go back" class="mb-2 ml-4 sm:ml-0">
        <i class="i-lucide-chevron-left" />
        {dict.get("back")}
      </Button>

      <DashboardHeading
        title={"Nuevo " + dict.get("business")}
        subtitle={"Crea tu negocio"}
      />
      <form
        hx-post="/d/business"
        hx-swap="outerHTML"
        hx-push-url="true"
        hx-target-4xx="#notification"
        autocomplete="off"
        class="mx-2 py-4 sm:mx-0"
      >
        <Input name="name" required="true" placeholder="Burguesía" rt />
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
        <Input
          name="instagram"
          placeholder="matibojko"
          class="flex-grow first-of-type:rounded-t-none"
        />
        <Input
          name="webpage"
          type="url"
          placeholder="https://www.janedoe.com"
        />
        <Input
          name="tags"
          options={tags}
          multiple="true"
          required="true"
          valueIsJson
          rb={!asAdmin}
        />

        <span class={cx("flex -space-x-px", asAdmin ? "" : "hidden")}>
          <Input
            name="featured"
            type="checkbox"
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow"
            rt
          />
          <Input
            name="enabled"
            type="checkbox"
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow"
            rb
          />
        </span>
        <Input
          name="owner"
          options={users}
          values={ownerId ? [ownerId] : undefined}
          class={asAdmin ? "" : "hidden"}
          rb
        />

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
  asAdmin,
}: {
  tags: SelectTag[];
  users: { id: number; name: string }[];
  business: SelectBusiness;
  asAdmin?: boolean;
}) => {
  return (
    <div hx-target="this">
      <Button size="xs" _="on click go back" class="mb-2 ml-4 sm:ml-0">
        <i class="i-lucide-chevron-left" />
        {dict.get("back")}
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
          rt
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
          value={business.phone}
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
        <Input
          name="instagram"
          placeholder="matibojko"
          class="flex-grow first-of-type:rounded-t-none"
          value={business.instagram || ""}
        />
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
          valueIsJson
          // @ts-ignore I know i'm passing the ids
          values={business.tags ? business.tags : undefined}
          rb={!asAdmin}
        />
        <span class={cx("flex -space-x-px", asAdmin ? "" : "hidden")}>
          <Input
            name="featured"
            type="checkbox"
            checked={business.featured ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow"
            rt
          />
          <Input
            name="enabled"
            type="checkbox"
            checked={business.enabled ? "true" : undefined}
            // HTML if not set value string sets "on" by default
            value="true"
            class="flex-grow"
            rb
          />
        </span>
        <Input
          name="owner"
          options={users}
          values={business.owner ? [business.owner] : undefined}
          class={asAdmin ? "" : "hidden"}
          rb
        />
        <span class="mt-2 flex justify-end">
          <Button intent="primary">{dict.get("save")}</Button>
        </span>
      </form>
    </div>
  );
};

Business.View = ({
  business,
  asAdmin,
}: {
  business: BusinessWithOwner;
  asAdmin?: boolean;
}) => {
  return (
    <div hx-target="this">
      {asAdmin ? (
        <Button size="xs" _="on click go back" class="ml-4 sm:ml-0">
          <i class="i-lucide-chevron-left" />
          {dict.get("back")}
        </Button>
      ) : (
        <DashboardHeading
          title={"Tu " + dict.get("business")}
          subtitle="Acordate de mantener todos los datos actualizados así los clientes te pueden encontrar fácil."
        />
      )}

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
      <div class="p-6">
        <div class="flex items-center gap-4">
          <img
            src={business.image ? business.image : undefined}
            width="50"
            height="50"
            alt="Imagen del local"
            class="h-20 w-20 rounded-full p-1"
          />
          <div class="flex-grow">
            <DashboardHeading
              title={business.name}
              subtitle={business.description || ""}
            />
          </div>
        </div>
        {/* Created , Updated */}
        <div class="mt-2 text-xs font-light text-gray-500">
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
        <div class="grid grid-cols-2 gap-x-6 gap-y-4 py-4 pr-8 text-sm">
          <div class="font-medium first-letter:capitalize">
            {dict.get("phone")}:
          </div>
          <div class="w-32 place-self-end overflow-hidden text-ellipsis whitespace-nowrap text-right sm:w-80">
            {business.phone}
          </div>

          <div class="font-medium first-letter:capitalize">
            {dict.get("instagram")}:
          </div>
          <div class="w-32 place-self-end overflow-hidden text-ellipsis whitespace-nowrap text-right sm:w-80">
            {business.instagram}
          </div>

          <div class="font-medium first-letter:capitalize">
            {dict.get("webpage")}:
          </div>
          <div
            class="w-32 place-self-end overflow-hidden text-ellipsis whitespace-nowrap text-right sm:w-80"
            title={business.webpage || undefined}
          >
            {business.webpage?.substring(8)}
          </div>

          <div class="font-medium first-letter:capitalize">
            {dict.get("address")}:
          </div>
          <div
            class="w-32 place-self-end overflow-hidden text-ellipsis whitespace-nowrap text-right sm:w-80"
            title={business.address || undefined}
          >
            {business.address}
          </div>

          <div class="font-medium first-letter:capitalize">
            {dict.get("location")}:
          </div>
          <div
            class="w-32 place-self-end overflow-hidden text-ellipsis whitespace-nowrap text-right sm:w-80"
            title={business.location || undefined}
          >
            {business.location?.substring(8)}
          </div>
        </div>
        {/* Categories */}
        <div>
          <div class="text-sm font-medium first-letter:capitalize">
            {dict.get("tags")}:
          </div>
          <div class="flex flex-wrap gap-4 pl-2 pt-1 text-sm font-light capitalize">
            {typeof business.tags === "string" &&
              business.tags.split(",").map((t) => <span>{t}</span>)}
          </div>
        </div>

        {asAdmin ? (
          <>
            {/* Owner */}
            <div class="py-4">
              <div class="text-sm font-medium first-letter:capitalize">
                {dict.get("owner")}:
              </div>
              <div class="flex flex-wrap gap-4 pl-2 pt-1 text-sm font-light">
                <span>{business.owner?.id}</span>
                <span>{business.owner?.name}</span>
                <span>{business.owner?.email}</span>
                <span>{business.owner?.role}</span>
                <span>{business.owner?.createdAt}</span>
              </div>
            </div>

            {/* Habilitado promocionado */}
            <div class="flex space-x-6 text-sm">
              <div class="flex items-center gap-3 font-medium capitalize">
                {dict.get("enabled")}:
                {business.enabled ? (
                  <i class="i-lucide-check text-emerald-600" />
                ) : (
                  <i class="i-lucide-x text-rose-600" />
                )}
              </div>
              <div class="flex items-center gap-3 font-medium capitalize">
                {dict.get("featured")}:
                {business.featured ? (
                  <i class="i-lucide-check text-emerald-600" />
                ) : (
                  <i class="i-lucide-x text-rose-600" />
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Business;
