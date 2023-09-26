import { BusinessWithOwner } from "@/services/business";
import { BackButton } from "@/ui/back-button";
import { Button } from "@/ui/button";
import Card from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { dict } from "@/utils/dictionary";

export const BusinessView = ({
  business,
  asAdmin,
}: {
  business: BusinessWithOwner;
  asAdmin?: boolean;
}) => {
  return (
    <div hx-target="this">
      <DashboardHeading
        title={"Tu " + dict.get("business")}
        action={
          <Button
            hx-get={`/d/business/${business.id}/edit`}
            hx-push-url="true"
            intent="primary"
            size="sm"
            preload
          >
            Editar
          </Button>
        }
      />
      {asAdmin && <BackButton />}
      <Card>
        <Card.Header class="flex-row gap-3">
          <div class="flex-grow space-y-2 sm:flex sm:gap-6">
            <img
              src={business.image ? business.image : undefined}
              width="50"
              height="50"
              alt="Imagen del local"
              class="h-20 w-20 rounded-full p-1"
            />
            <div>
              <Card.Title>{business.name}</Card.Title>
              <Card.Description>
                {business.description}
                <div class="mt-3 text-xs font-light text-gray-500">
                  <div class="first-letter:capitalize">
                    <span class="font-medium">{dict.get("createdAt")}: </span>
                    {business.createdAt}
                  </div>
                  <div class="first-letter:capitalize">
                    <span class="font-medium">{dict.get("updatedAt")}: </span>
                    {business.updatedAt}
                  </div>
                </div>
              </Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
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
            <div class="flex flex-wrap gap-4 pl-2 pt-1 text-sm font-light">
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
                <div class="flex items-center gap-3 font-medium">
                  {dict.get("enabled")}:
                  {business.enabled ? (
                    <i class="i-lucide-check text-emerald-600" />
                  ) : (
                    <i class="i-lucide-x text-rose-600" />
                  )}
                </div>
                <div class="flex items-center gap-3 font-medium">
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
        </Card.Content>
      </Card>
    </div>
  );
};
