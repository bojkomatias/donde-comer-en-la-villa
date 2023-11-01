import { SelectBusiness } from "@/db/schema/business";
import { badge } from "@/ui/badge";
import { button } from "@/ui/button";
import { card } from "@/ui/card";
import { EmptyState } from "@/ui/empty-state";
import { Review } from "./reviews";
import { SelectBusinessHours } from "@/db/schema/business-hours";
import { OpensIn } from "./opens-in";

export const Results = ({
  businesses,
}: {
  businesses: (SelectBusiness & {
    reviews: number | null;
    businessHours: SelectBusinessHours | null;
  })[];
}) => {
  return (
    <div id="results">
      {businesses.length > 0 ? (
        <div class="space-y-2 px-1 py-4 sm:px-4 md:grid md:grid-cols-2 md:gap-2 md:space-y-0">
          {businesses.map((business) => (
            <BusinessItem business={business} />
          ))}
        </div>
      ) : (
        <EmptyState>
          No se encontraron resultados <br /> Pruebe modificar la búsqueda
        </EmptyState>
      )}
    </div>
  );
};

const BusinessItem = ({
  business,
}: {
  business: SelectBusiness & {
    reviews: number | null;
    businessHours: SelectBusinessHours | null;
  };
}) => (
  <div class={card().base({ class: "relative p-2" })}>
    <div class="flex">
      <img
        src={business.image}
        height="300"
        width="200"
        class="z-10 aspect-square w-40 rounded-lg object-cover shadow-lg"
        alt="Imagen del local"
      />

      <div class="flex-grow p-1 pl-4 md:p-3">
        <div class="flex justify-between">
          <div>
            <Review avgReviews={business.reviews} />
            <h2 class="text-xl font-bold">{business.name}</h2>
            <OpensIn businessHours={business.businessHours} />
          </div>
          <button
            class={button({
              size: "xs",
              intent: "primary",
              class: "col-span-1",
            })}
          >
            Ver Local
          </button>
        </div>
        <div class="flex items-center gap-3">
          <button>{business.phone}</button>

          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            class={button({ intent: "link" })}
          >
            <i class="i-simple-icons-instagram h-5 w-5 group-hover:text-rose-500" />
          </a>
          <a
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            class={button({ intent: "link" })}
          >
            <i class="i-simple-icons-whatsapp h-5 w-5 group-hover:text-emerald-500" />
          </a>
          {business.location && (
            <a
              href={business.location ? business.location : undefined}
              target="_blank"
              class={button({ intent: "link" })}
            >
              Ubicación
              <i class="i-lucide-map-pin h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-4 h-8 bg-accent">
      <div class="absolute left-40 space-x-1 pl-4">
        {typeof business.tags === "string" &&
          business.tags
            .split(",")
            .map((e) => (
              <span class="px-1 text-2xl drop-shadow-lg">
                {e.substring(0, 2)}
              </span>
            ))}
      </div>
    </div>
  </div>
);
