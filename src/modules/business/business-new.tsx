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

export const BusinessNew = ({
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
      <DashboardHeading
        title={dict.get("create") + " " + dict.get("business")}
      />
      <DashboardContent>
        <BackButton />
        <div class={card().base()}>
          <h2 class={card().title()}>{"Nuevo " + dict.get("business")}</h2>
          <p class={card().description()}>Crea tu negocio</p>

          <form
            hx-post="/d/business"
            hx-swap="outerHTML"
            hx-push-url="true"
            hx-target-4xx="#notification"
            autocomplete="off"
            hx-encoding="multipart/form-data"
          >
            <div class={card().content()}>
              <Input name="name" required="true" placeholder="Burguesía" rt />
              <Input
                name="description"
                //Most businesses don't have description
                //required="true"
                placeholder="Las burgers más burgueses de toda la burguesía"
              />
              <Input
                _="on change put my files[0].name into #imageName.innerHTML then remove .hidden from #imageName then remove .hidden from #imageContainer then log my files end 
                on change js  document.getElementById('imageContainer').src = URL.createObjectURL(
                  document.getElementById('image').files[0],
                );
                end"
                name="image"
                type="file"
                id="image"
                accept="image/*"
                title="Subí el logo o una imagen de tu negocio"
              />
              <Input
                name="phone"
                required="true"
                type="tel"
                pattern="[+549]{4}[0-9]{10}"
                title="Formato de número como WhatsApp"
                placeholder="+54 9 343 5111111"
              />

              <Input name="address" placeholder="25 de Mayo y Sarmiento" />
              <Input
                name="location"
                placeholder="https://maps.gl.io"
                type="url"
                title="Ubicación de Google Maps"
              />
              <Input
                title="Sin el arroba (@)"
                name="instagram"
                placeholder="usuario_instagram"
                class="flex-grow first-of-type:rounded-t-none"
              />
              <Input
                name="modality"
                options={modalityOptions}
                multiple="true"
                valueIsJson
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
                />
                <Input
                  name="enabled"
                  type="checkbox"
                  // HTML if not set value string sets "on" by default
                  value="true"
                  class="flex-grow"
                />
              </span>
              <Input
                name="owner"
                options={users}
                values={ownerId ? [ownerId] : undefined}
                class={asAdmin ? "" : "hidden"}
                rb
              />
            </div>
            <div class={card().footer({ class: "justify-end" })}>
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
