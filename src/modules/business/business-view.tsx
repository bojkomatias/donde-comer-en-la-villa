import { BusinessWithRelations } from "@/services/business";
import { BackButton } from "@/ui/back-button";
import { badge } from "@/ui/badge";
import { button } from "@/ui/button";
import { card } from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { details } from "@/ui/detail-list";
import { cx } from "@/utils/cx";
import { dayNumberToText } from "@/utils/date-helpers";
import { dict } from "@/utils/dictionary";

export const BusinessView = ({
  business,
  asAdmin,
}: {
  business: BusinessWithRelations;
  asAdmin?: boolean;
}) => {
  return (
    <div hx-target="this">
      <DashboardHeading
        title={dict.get("yourBusiness")}
        action={
          <span class="space-x-1.5">
            <button
              class={button({ intent: "primary", size: "sm" })}
              hx-get={`/d/business/${business.id}/hours`}
              hx-push-url="true"
              preload
            >
              {dict.get("businessHours")}
            </button>
            <button
              class={button({ intent: "primary", size: "sm" })}
              hx-get={`/d/business/${business.id}/edit`}
              hx-push-url="true"
              preload
            >
              {dict.get("edit")}
            </button>
          </span>
        }
      />
      <DashboardContent>
        {asAdmin && <BackButton />}
        <div class={card().base()}>
          <div class="flex-row gap-3">
            <div class="flex-grow space-y-2 sm:flex sm:gap-6 items-center pl-6">
              <img
                src={business.image ? business.image : undefined}
                width="50"
                height="50"
                alt="Imagen del local"
                class="h-20 w-20 rounded-full p-1"
              />
              <div>
                <h2 class={card().title()}>{business.name}</h2>
                <p class={card().description()}>
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
                </p>
              </div>
            </div>
          </div>
          <div class={card().content()}>
            <dl class={details().dl()}>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("phone")}</dt>
                <dd class={details().dd()}>{business.phone}</dd>
              </div>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("address")}</dt>
                <dd class={details().dd()}>{business.address}</dd>
              </div>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("location")}</dt>
                <dd class={details().dd()}>{business.location}</dd>
              </div>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("instagram")}</dt>
                <dd class={details().dd()}>{business.instagram}</dd>
              </div>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("tags")}</dt>
                <dd
                  class={details().dd({
                    class: "gap-x-1 overflow-x-auto pb-px",
                  })}
                >
                  {typeof business.tags === "string" &&
                    business.tags
                      .split(",")
                      .map((t) => <span class={badge()}>{t}</span>)}
                </dd>
              </div>
              <div class={details().item()}>
                <dt class={details().dt()}>{dict.get("bHours")}</dt>
                <dd class={details().dd({ class: "flex-col items-start" })}>
                  {business.businessHours.map((e) => (
                    <div class="flex gap-1.5">
                      <span class="text-foreground">
                        {dayNumberToText[e.day]}
                      </span>
                      de
                      <span class="font-medium text-foreground">{e.opens}</span>
                      a
                      <span class="font-medium text-foreground">
                        {e.closes}
                      </span>
                    </div>
                  ))}
                </dd>
              </div>
              {asAdmin && (
                <>
                  <div class={details().item()}>
                    <dt class={details().dt()}>{dict.get("enabled")}</dt>
                    <dd class={details().dd()}>
                      <i
                        class={cx(
                          business.enabled ? "i-lucide-check" : "i-lucide-x",
                        )}
                      />
                    </dd>
                  </div>
                  <div class={details().item()}>
                    <dt class={details().dt()}>{dict.get("featured")}</dt>
                    <dd class={details().dd()}>
                      <i
                        class={cx(
                          business.featured ? "i-lucide-check" : "i-lucide-x",
                        )}
                      />
                    </dd>
                  </div>
                  <div class={details().item()}>
                    <dt class={details().dt()}>{dict.get("owner")}</dt>
                    <dd class={details().dd()}>
                      {business.owner?.name}
                      <span>
                        <span class="font-semibold">ID: </span>
                        {business.owner?.id}
                        {" | "}
                        <span class="font-semibold">Email: </span>
                        {business.owner?.email}
                      </span>
                    </dd>
                  </div>
                  <div class={details().item()}>
                    <dt class={details().dt()}>{dict.get("role")}</dt>
                    <dd class={details().dd({ class: "text-xs uppercase" })}>
                      {business.owner?.role}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </DashboardContent>
    </div>
  );
};
