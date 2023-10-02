import { SelectTag } from "@/db/schema/tag";
import { BackButton } from "@/ui/back-button";
import { Button } from "@/ui/button";
import Card from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Input } from "@/ui/input";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

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
        <Card>
          <Card.Header>
            <Card.Title>{"Nuevo " + dict.get("business")}</Card.Title>
            <Card.Description>Crea tu negocio</Card.Description>
          </Card.Header>
          <form
            hx-post="/d/business"
            hx-swap="outerHTML"
            hx-push-url="true"
            hx-target-4xx="#notification"
            autocomplete="off"
          >
            <Card.Content>
              <Input name="name" required="true" placeholder="Burguesía" rt />
              <Input
                name="description"
                required="true"
                placeholder="Las burgers más burgueses de toda la burguesía"
              />
              <Input
                name="image"
                required="true"
                placeholder="https://scontent.cdninstagram.com/v/"
                title="Podes copiar tu imagen de Instagram"
              />
              <Input
                name="phone"
                required="true"
                type="tel"
                pattern="[+549]{4}[0-9]{10}"
                title="Formato de numero como Whatsapp"
                placeholder="+5493435111111"
              />
              <Input name="address" placeholder="25 de Mayo y Sarmiento" />
              <Input
                name="location"
                placeholder="https://maps.gl.io"
                type="url"
                title="Ubicación de google maps"
              />
              <Input
                name="instagram"
                placeholder="matibojko"
                class="flex-grow first-of-type:rounded-t-none"
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
            </Card.Content>
            <Card.Footer class="flex justify-end">
              <Button intent="primary">{dict.get("save")}</Button>
            </Card.Footer>
          </form>
        </Card>
      </DashboardContent>
    </div>
  );
};
