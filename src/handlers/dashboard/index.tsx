import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { tag } from "@/db/schema/tags";
import { ProfilePage } from "./profile/page";
import { DashboardLayout } from "./layout";
import { TagFormRow } from "./tags/components/row-edit";
import { TagPage } from "./tags/page";
import { TagRow } from "./tags/components/row-view";
import { user } from "@/db/schema/user";
import { Setup } from "../setup";

const dashboard = (app: Setup) =>
  app.group(
    "/dashboard",
    {
      beforeHandle: async ({ user, set }) => {
        if (!user) {
          set.status = 401;
          return (set.redirect = "/");
        }
      },
    },
    (app) =>
      app
        // Can use user!.role because it's already guarded
        .get("/", async ({ user: u, store: { db } }) => {
          const r = await db
            .select()
            .from(user)
            .where(eq(user.id, Number(u?.id)));
          return (
            <DashboardLayout role={r[0].role} current="/dashboard">
              <ProfilePage user={r[0]} />
            </DashboardLayout>
          );
        })
        .get("/business", ({ user }) => (
          <DashboardLayout role={user!.role} current="/dashboard/business">
            <div class="space-y-3">
              <Button intent="primary">Primary</Button>
              <Button intent="secondary">Secondary</Button>
              <Button intent="destructive">Destructive</Button>
              <Button>Default</Button>
            </div>
          </DashboardLayout>
        ))
        // Admin access only
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
              .get("/", async ({ user, store: { db } }) => {
                const r = await db.select().from(tag);
                return (
                  <DashboardLayout role={user!.role} current="/dashboard/tag">
                    <TagPage tags={r} />
                  </DashboardLayout>
                );
              })
              .get("/:id/form", async ({ params: { id }, store: { db } }) => {
                const r = await db
                  .select()
                  .from(tag)
                  .where(eq(tag.id, Number(id)));

                return <TagFormRow tag={r[0]} />;
              })
              .get("/:id/row", async ({ params: { id }, store: { db } }) => {
                const r = await db
                  .select()
                  .from(tag)
                  .where(eq(tag.id, Number(id)));

                return <TagRow tag={r[0]} />;
              })
              .put(
                "/:id",
                async ({ params: { id }, body, store: { db }, set }) => {
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
                      <p
                        class="text-xs text-red-600"
                        _="init wait 6s then hide me"
                      >
                        * A tag already exists with that name
                      </p>
                    );
                  }

                  return <TagRow tag={r[0]} />;
                },
                { body: "tag" },
              )
              .post(
                "/",
                async ({ body, store: { db }, set }) => {
                  let r;
                  try {
                    r = await db
                      .insert(tag)
                      .values({ name: body.name.toLocaleLowerCase() })
                      .returning();
                  } catch (error) {
                    set.status = 403;
                    return (
                      <p
                        class="text-xs text-red-600"
                        _="init wait 6s then hide me"
                      >
                        * A tag already exists with that name
                      </p>
                    );
                  }

                  return <TagRow tag={r[0]} />;
                },
                { body: "tag" },
              ),
        ),
  );
export default dashboard;
