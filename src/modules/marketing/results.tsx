import { SelectBusiness } from "@/db/schema/business";
import { Badge } from "@/ui/badge";
import { cx } from "@/utils/cx";

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
        <div
          id="results"
          class="mx-auto mt-20 max-w-sm text-sm font-light text-gray-500"
        >
          No se encontraron datos modifique su búsqueda
        </div>
      )}
    </>
  );
};

const BusinessItem = ({ business }: { business: SelectBusiness }) => (
  <div class="flex flex-col rounded bg-gray-50 p-2 ring-1 ring-inset ring-gray-500/5 dark:bg-gray-900/50">
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
        <div class="flex flex-wrap gap-x-6 gap-y-2 pt-3">
          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
          >
            <i class="i-simple-icons-instagram group-hover:text-rose-600" />@
            {business.instagram}
          </a>
          <a
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
          >
            <i class="i-simple-icons-whatsapp group-hover:text-emerald-600" />
            {business.phone}
          </a>
          {business.address && (
            <a
              href={business.location ? business.location : undefined}
              target="_blank"
              class={cx(
                "group flex items-center gap-1 text-xs opacity-80",
                business.location &&
                  "underline underline-offset-1 hover:underline-offset-4 hover:opacity-100 hover:drop-shadow-sm",
              )}
            >
              <i class="i-lucide-map-pin" />
              {business.address}
            </a>
          )}
          {business.webpage && (
            <a
              href={business.webpage}
              target="_blank"
              class="group flex items-center gap-1 text-xs underline-offset-2 opacity-80 hover:underline hover:opacity-100 hover:drop-shadow-sm"
            >
              <i class="i-lucide-external-link" />
              {business.webpage.substring(8)}
            </a>
          )}
        </div>
      </div>
    </div>
    <div class="mt-4 flex-grow" />
    <div class="mx-2 flex gap-1 overflow-auto p-1">
      {typeof business.tags === "string" &&
        business.tags.split(",").map((e) => <Badge>{e}</Badge>)}
    </div>
  </div>
);
