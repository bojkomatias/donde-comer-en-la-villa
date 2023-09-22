import { SelectBusiness } from "@/db/schema/business";
import { Badge } from "@/ui/badge";

export const Results = ({ businesses }: { businesses: SelectBusiness[] }) => {
  return (
    <>
      {businesses.length > 0 ? (
        <div
          id="results"
          class="space-y-2 p-4 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 xl:grid-cols-3"
        >
          {businesses.map((business) => (
            <BusinessItem business={business} />
          ))}
        </div>
      ) : (
        <div class="mx-auto mt-20 max-w-sm text-sm font-light text-gray-500">
          No se encontraron datos modifique su búsqueda
        </div>
      )}
    </>
  );
};

const BusinessItem = ({ business }: { business: SelectBusiness }) => (
  <div class="flex flex-col rounded bg-gray-50 p-2 ring-1 ring-inset ring-gray-500/5 hover:shadow dark:bg-gray-900/50 dark:shadow-black">
    <div class="flex gap-3 pr-4">
      <img
        src={business.image}
        height="50"
        width="50"
        class="h-20 w-20 rounded-full p-2"
        alt="business image"
      />
      <div class="flex-grow">
        <div class="font-bold leading-loose">{business.name}</div>
        <div class="-mt-1 text-xs font-light">{business.description}</div>
        <div class="flex flex-wrap gap-3 pt-3">
          <a
            href="#"
            class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
          >
            <i class="i-simple-icons-instagram h-3.5 w-3.5" />@
            {business.instagram}
          </a>
          <a
            href="#"
            class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
          >
            <i class="i-simple-icons-whatsapp h-3.5 w-3.5" />
            {business.phone}
          </a>
          {business.address && (
            <a
              href="#"
              class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
            >
              <i class="i-lucide-map-pin h-4 w-4" />
              {business.address}
            </a>
          )}
          {business.webpage && (
            <a
              href="#"
              class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
            >
              <i class="i-lucide-code-2 h-4 w-4" />
              {business.webpage}
            </a>
          )}
        </div>
      </div>
    </div>
    <div class="flex-grow" />
    <div class="mx-4 mt-4 flex gap-1 overflow-hidden">
      {typeof business.tags === "string" &&
        business.tags.split(",").map((e) => <Badge>{e}</Badge>)}
    </div>
  </div>
);
