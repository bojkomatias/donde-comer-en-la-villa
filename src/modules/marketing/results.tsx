import { SelectBusiness } from "@/db/schema/business";
import { Badge } from "@/ui/badge";
import { buttonStyles } from "@/ui/button";
import Card from "@/ui/card";
import { EmptyState } from "@/ui/empty-state";
import { Review } from "./reviews";

export const Results = ({
  businesses,
}: {
  businesses: (SelectBusiness & { reviews: number | null })[];
}) => {
  return (
    <div id="results">
      {businesses.length > 0 ? (
        <div class="space-y-2 px-1 py-4 sm:px-4 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 xl:grid-cols-3">
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
  business: SelectBusiness & { reviews: number | null };
}) => (
  <Card class="flex flex-col">
    <Card.Header class="flex-row gap-6 p-3 pb-0">
      <img
        src={business.image}
        height="50"
        width="50"
        class="float-left h-20 w-20 rounded-full pb-1 pr-1"
      />
      <div class="flex-grow">
        <div class="flex">
          <Card.Title class="flex-grow">{business.name}</Card.Title>
          <Review avgReviews={business.reviews} />
        </div>
        <Card.Description class="-mt-1 leading-4">
          {business.description}
        </Card.Description>
      </div>
    </Card.Header>
    <Card.Content class="-mt-2 flex flex-grow flex-row-reverse flex-wrap-reverse gap-x-4 pb-3 pt-0">
      {business.location && (
        <a
          href={business.location ? business.location : undefined}
          target="_blank"
          class={buttonStyles({ intent: "link" })}
        >
          Ubicación
          <i class="i-lucide-map-pin" />
        </a>
      )}
      {business.address && (
        <span
          class={buttonStyles({
            intent: "link",
            class: "hover:no-underline",
          })}
        >
          <i class="i-lucide-map" />
          {business.address}
        </span>
      )}
      <a
        href={`https://instagram.com/${business.instagram}`}
        target="_blank"
        class={buttonStyles({ intent: "link" })}
      >
        <i class="i-simple-icons-instagram group-hover:text-rose-600" />@
        {business.instagram}
      </a>
      <a
        href={`https://wa.me/${business.phone}`}
        target="_blank"
        class={buttonStyles({ intent: "link" })}
      >
        <i class="i-simple-icons-whatsapp group-hover:text-emerald-600" />
        {business.phone}
      </a>
    </Card.Content>

    <Card.Footer class="bg-muted/50 p-1">
      <div class="flex w-full items-center gap-x-1.5 gap-y-1.5 overflow-y-auto overflow-x-hidden pr-0.5">
        {typeof business.tags === "string" &&
          business.tags
            .split(",")
            .map((e) => (
              <Badge class="cursor-default select-none bg-accent py-0.5 text-lg shadow-inner shadow-muted-foreground/50 saturate-[75%] hover:saturate-150 dark:shadow-black">
                {e.substring(0, 2)}
              </Badge>
            ))}
      </div>
    </Card.Footer>
  </Card>
);
