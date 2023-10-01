import { BusinessWithOwner } from "@/services/business";
import { BackButton } from "@/ui/back-button";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Card from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import Details from "@/ui/detail-list";
import { cx } from "@/utils/cx";
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
        title={dict.get("yourBusiness")}
        action={
          <span class="space-x-1.5">
            <Button
              hx-get={`/d/business/${business.id}/hours`}
              hx-push-url="true"
              intent="primary"
              size="sm"
              preload
            >
              {dict.get("businessHours")}
            </Button>
            <Button
              hx-get={`/d/business/${business.id}/edit`}
              hx-push-url="true"
              intent="primary"
              size="sm"
              preload
            >
              {dict.get("edit")}
            </Button>
          </span>
        }
      />
      <DashboardContent>
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
            <Details>
              <Details.Detail>
                <Details.Term>{dict.get("phone")}</Details.Term>
                <Details.Description>{business.phone}</Details.Description>
              </Details.Detail>
              <Details.Detail>
                <Details.Term>{dict.get("address")}</Details.Term>
                <Details.Description>{business.address}</Details.Description>
              </Details.Detail>
              <Details.Detail>
                <Details.Term>{dict.get("location")}</Details.Term>
                <Details.Description>{business.location}</Details.Description>
              </Details.Detail>
              <Details.Detail>
                <Details.Term>{dict.get("instagram")}</Details.Term>
                <Details.Description>{business.instagram}</Details.Description>
              </Details.Detail>
              <Details.Detail>
                <Details.Term>{dict.get("tags")}</Details.Term>
                <Details.Description class="gap-x-1 overflow-x-auto pb-px">
                  {typeof business.tags === "string" &&
                    business.tags.split(",").map((t) => <Badge>{t}</Badge>)}
                </Details.Description>
              </Details.Detail>
              {asAdmin && (
                <>
                  <Details.Detail>
                    <Details.Term>{dict.get("enabled")}</Details.Term>
                    <Details.Description>
                      <i
                        class={cx(
                          business.enabled ? "i-lucide-check" : "i-lucide-x",
                        )}
                      />
                    </Details.Description>
                  </Details.Detail>
                  <Details.Detail>
                    <Details.Term>{dict.get("featured")}</Details.Term>
                    <Details.Description>
                      <i
                        class={cx(
                          business.featured ? "i-lucide-check" : "i-lucide-x",
                        )}
                      />
                    </Details.Description>
                  </Details.Detail>
                  <Details.Detail>
                    <Details.Term>{dict.get("owner")}</Details.Term>
                    <Details.Description>
                      {business.owner?.name}
                      <span>
                        <span class="font-semibold">ID: </span>
                        {business.owner?.id}
                        {" | "}
                        <span class="font-semibold">Email: </span>
                        {business.owner?.email}
                      </span>
                    </Details.Description>
                  </Details.Detail>
                  <Details.Detail>
                    <Details.Term>{dict.get("role")}</Details.Term>
                    <Details.Description class="text-xs uppercase">
                      {business.owner?.role}
                    </Details.Description>
                  </Details.Detail>
                </>
              )}
            </Details>
          </Card.Content>
        </Card>
      </DashboardContent>
    </div>
  );
};
