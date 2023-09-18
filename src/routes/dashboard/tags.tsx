import Elysia from "elysia";
import setup from "../../(setup)";
import { tag } from "@/db/schema/tags";
import { withLayout } from "@/components/layout";
import DashboardLayout from "@/components/dashboard-layout";
import Tags from "@/components/tag";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export const tags = new Elysia({
  name: "tags",
})
  .use(setup)
  .group(
    "/tag",
    {
      beforeHandle: ({ user, set }) => {
        if (user!.role !== "admin") {
          set.status = 401;
          return "Unauthorized";
        }
      },
    },
    (app) =>
      app
        .get("/", async ({ user, headers }) => {
          const r = await db.select().from(tag);
          return withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={user!.role} current="/dashboard/tag">
              <Tags tags={r} />
            </DashboardLayout>,
          );
        })
        .get("/:id/form", async ({ params: { id }, store: { db } }) => {
          const r = await db
            .select()
            .from(tag)
            .where(eq(tag.id, Number(id)));

          return <Tags.Edit tag={r[0]} />;
        })
        .get("/:id/row", async ({ params: { id }, store: { db } }) => {
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
                <p class="text-xs text-red-600" _="init wait 6s then hide me">
                  * A tag already exists with that name
                </p>
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
                <p class="text-xs text-red-600" _="init wait 6s then hide me">
                  * A tag already exists with that name
                </p>
              );
            }

            return <Tags.Row tag={r[0]} />;
          },
          { body: "tag" },
        ),
  );
