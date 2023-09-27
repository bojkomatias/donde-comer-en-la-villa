import { SelectBusiness } from "@/db/schema/business";
import { Badge } from "@/ui/badge";
import { buttonStyles } from "@/ui/button";
import Card from "@/ui/card";
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
            <BusinessItemV2 business={business} />
          ))}
        </div>
      ) : (
        <div
          id="results"
          class="m-4 rounded bg-card py-20 text-center text-sm font-thin leading-loose ring-1 ring-inset ring-ring"
        >
          No se encontraron datos.
          <br /> Pruebe modificar su búsqueda o limpiar los filtros.
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
            class={buttonStyles({ intent: "link", size: "xs" })}
          >
            <i class="i-simple-icons-instagram group-hover:text-rose-600" />@
            {business.instagram}
          </a>
          <a
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            class={buttonStyles({ intent: "link", size: "xs" })}
          >
            <i class="i-simple-icons-whatsapp group-hover:text-emerald-600" />
            {business.phone}
          </a>
          {business.address && (
            <a
              href={business.location ? business.location : undefined}
              target="_blank"
              class={buttonStyles({ intent: "link", size: "xs" })}
            >
              <i class="i-lucide-map-pin" />
              {business.address}
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

const BusinessItemV2 = ({ business }: { business: SelectBusiness }) => (
  <Card class="flex flex-col">
    <Card.Header class="flex-row gap-6 p-4 pb-0">
      <img
        src={business.image}
        height="50"
        width="50"
        class="float-left h-20 w-20 rounded-full pb-1 pr-1"
      />
      <div class="mt-2">
        <Card.Title>{business.name}</Card.Title>
        <Card.Description>{business.description}</Card.Description>
      </div>
    </Card.Header>
    <Card.Content class="gap y-2 flex flex-grow flex-row-reverse flex-wrap-reverse gap-x-4 pb-3 pt-0">
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
    <Card.Footer class="flex-wrap items-center gap-x-1.5 gap-y-1.5 rounded-b-xl bg-accent py-2">
      {typeof business.tags === "string" &&
        business.tags
          .split(",")
          .map((e) => (
            <Badge class="cursor-pointer bg-muted py-0.5 text-lg shadow-inner shadow-muted-foreground/50 transition duration-300 ease-in-out hover:shadow-muted-foreground hover:brightness-105">
              {e.substring(0, 2)}
            </Badge>
          ))}
    </Card.Footer>
  </Card>
);
