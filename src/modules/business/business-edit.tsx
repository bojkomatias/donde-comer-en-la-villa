import { SelectBusiness } from "@/db/schema/business";
import { SelectTag } from "@/db/schema/tag";
import { BackButton } from "@/ui/back-button";
import { button } from "@/ui/button";
import { card } from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Input } from "@/ui/input";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";
import { modalityOptions } from "@/utils/modality-options";

export const BusinessEdit = ({
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
      <DashboardHeading title={dict.get("edit") + " " + dict.get("business")} />
      <DashboardContent>
        <BackButton />
        <div class={card().base()}>
          <h2 class={card().title()}>{"Editar " + dict.get("business")}</h2>
          <p class={card().description()}>Edita tu negocio</p>

          <form
            hx-put={`/d/business/${business.id}`}
            hx-swap="outerHTML"
            hx-push-url="true"
            hx-target-4xx="#notification"
            autocomplete="off"
            hx-encoding="multipart/form-data"
          >
            <div class={card().content()}>
              <Input
                name="name"
                required="true"
                placeholder="Burguesía"
                value={business.name}
                rt
              />
              <Input
                name="description"
                //Most businesses don't have description
                //required="true"
                placeholder="Las burgers más burgueses"
                value={business.description || ""}
              />
              <Input
                _="on change put my files[0].name into #imageName.innerHTML then remove .hidden from #imageName then remove .hidden from #imageContainer then log my files end 
               on change js  document.getElementById('imageContainer').src = URL.createObjectURL(
                 document.getElementById('image').files[0],
               );
               end"
                accept="image/*"
                name="image"
                //Removed the "required=true" attribute because when editing, it'll already have an image. It should only change if there's a new image.
                placeholder="https://scontent.cdninstagram.com/v/"
                value={business.image}
                type="file"
                title="Subí el logo o una imagen de tu negocio"
              />
              <Input
                name="phone"
                required="true"
                type="tel"
                pattern="[+549]{4}[0-9]{10}"
                title="Formato de número como WhatsApp"
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
                title="Ubicación de Google Maps"
              />
              <Input
                title="Sin el arroba (@)"
                name="instagram"
                placeholder="usuario_instagram"
                class="flex-grow first-of-type:rounded-t-none"
                value={business.instagram || ""}
              />
              <Input
                name="modality"
                options={modalityOptions}
                multiple="true"
                valueIsJson
                // @ts-ignore I know i'm passing the ids
                values={business.modality ? business.modality : undefined}
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
                />
                <Input
                  name="enabled"
                  type="checkbox"
                  checked={business.enabled ? "true" : undefined}
                  // HTML if not set value string sets "on" by default
                  value="true"
                  class="flex-grow"
                />
              </span>
              <Input
                name="owner"
                options={users}
                values={business.owner ? [business.owner] : undefined}
                class={asAdmin ? "" : "hidden"}
                rb
              />
            </div>
            <div class={card().footer({ class: "flex justify-end" })}>
              <button class={button({ intent: "primary" })}>
                {dict.get("save")}
              </button>
            </div>
          </form>
        </div>
      </DashboardContent>
    </div>
  );
};
