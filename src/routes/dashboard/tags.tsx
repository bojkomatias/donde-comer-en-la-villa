import Elysia from "elysia";
import setup from "@/(setup)";
import { tag } from "@/db/schema/tag";
import DashboardLayout from "@/components/dashboard/layout";
import Tags from "@/components/tag";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { Layout } from "@/components/layout";
import { Notification } from "@/components/ui/notification";

const tags = new Elysia({
  name: "tags",
})
  .use(setup)

  .get("/", async ({ JWTUser, headers }) => {
    const r = await db.select().from(tag);
    return headers["hx-request"] ? (
      <DashboardLayout role={JWTUser!.role} current="/d/tag">
        <Tags tags={r} />
      </DashboardLayout>
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/tag">
          <Tags tags={r} />
        </DashboardLayout>
      </Layout>
    );
  })
  .get("/:id/form", async ({ params: { id } }) => {
    const r = await db
      .select()
      .from(tag)
      .where(eq(tag.id, Number(id)));

    return <Tags.Edit tag={r[0]} />;
  })
  .get("/:id/row", async ({ params: { id } }) => {
    const r = await db
      .select()
      .from(tag)
      .where(eq(tag.id, Number(id)));

    return <Tags.Row tag={r[0]} />;
  })
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      let r;
      try {
        r = await db
          .update(tag)
          .set({ name: body.name.toLocaleLowerCase() })
          .where(eq(tag.id, Number(id)))
          .returning();
      } catch (error) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ya existe una categoría con ese nombre"
          />
        );
      }

      return <Tags.Row tag={r[0]} />;
    },
    { body: "tag" },
  )
  .post(
    "/",
    async ({ body, set }) => {
      let r;
      try {
        r = await db
          .insert(tag)
          .values({ name: body.name.toLocaleLowerCase() })
          .returning();
      } catch (error) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ya existe una categoría con ese nombre"
          />
        );
      }

      return <Tags.Row tag={r[0]} />;
    },
    { body: "tag" },
  );

export default tags;
