import Elysia from "elysia";
import setup from "@/routes/(setup)";
import { tagForm } from "@/db/schema/tag";
import Tags from "@/modules/tag";
import { Notification } from "@/ui/notification";
import { createTag, getTagById, getTags, updateTag } from "@/services/tag";
import { DashboardLayout } from "@/ui/dashboard/layout";

const tags = new Elysia({
  name: "tags",
  prefix: "/d/tag",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    const tags = await getTags();

    return headers["hx-request"] ? (
      <Tags tags={tags} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <Tags tags={tags} />
      </DashboardLayout>
    );
  })
  .get("/:id/form", async ({ params: { id } }) => {
    const tag = await getTagById(parseInt(id));

    return <Tags.Edit tag={tag} />;
  })
  .get("/:id/row", async ({ params: { id } }) => {
    const tag = await getTagById(parseInt(id));

    return <Tags.Row tag={tag} />;
  })
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      const tag = await updateTag(parseInt(id), {
        name: body.name.toLocaleLowerCase(),
      });
      // Handle existing tag error
      if (!tag) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ya existe una categoría con ese nombre"
          />
        );
      }

      return <Tags.Row tag={tag} />;
    },
    { body: tagForm },
  )
  .post(
    "/",
    async ({ body, set }) => {
      const tag = await createTag({
        name: body.name.toLocaleLowerCase(),
      });
      // Handle existing tag error
      if (!tag) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ya existe una categoría con ese nombre"
          />
        );
      }

      return <Tags.Row tag={tag} />;
    },
    { body: tagForm },
  );

export default tags;
