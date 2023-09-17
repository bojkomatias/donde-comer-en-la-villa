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
import { AttributeEdit, UserAttribute } from "./profile/attribute-edit";
import { t } from "elysia";
import { Layout, withLayout } from "@/components/layout";
import { Fragment } from "@elysiajs/html";

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
        /** Profile */
        .get("/", async ({ user: u, store: { db }, headers }) => {
          const r = await db
            .select()
            .from(user)
            .where(eq(user.id, Number(u?.id)));
          return withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={r[0].role} current="/dashboard">
              <ProfilePage user={r[0]} />
            </DashboardLayout>,
          );
        })
        .get("/:id/:attr", ({ params: { id, attr }, query }) => (
          <AttributeEdit
            id={id}
            attribute={attr}
            value={query.value as string}
          />
        ))
        .patch("/:id", async ({ params: { id }, store: { db }, body }) => {
          const [attr, val] = Object.entries(
            body as { [key: string]: string },
          ).flat();
          const r = await db
            .update(user)
            .set({ [attr]: val })
            .where(eq(user.id, Number(id)))
            // @ts-ignore I know that I'm passing a safe key like 'name'
            .returning({ [attr]: user[attr] });

          return <UserAttribute id={id} attribute={attr} value={r[0][attr]} />;
        })
        .patch(
          "/password",
          async ({ user: u, store: { db }, body, set }) => {
            const r = await db
              .select({ currentPassword: user.password })
              .from(user)
              .where(eq(user.id, Number(u?.id)));

            if (r[0].currentPassword !== body.currentPassword) {
              set.status = 403;
              return (
                <p class="text-sm text-red-600">
                  * Current password doesn't match the existing one
                </p>
              );
            }
            await db
              .update(user)
              .set({ password: body.password })
              .where(eq(user.id, Number(u?.id)));

            return <p class="text-sm text-cyan-600">Successfully updated</p>;
          },
          {
            body: t.Object({
              currentPassword: t.String(),
              password: t.String(),
            }),
          },
        )

        .get("/business", ({ user, headers }) => {
          console.log(headers);

          return withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={user!.role} current="/dashboard/business">
              <div class="space-y-3">
                <Button intent="primary">Primary</Button>
                <Button intent="secondary">Secondary</Button>
                <Button intent="destructive">Destructive</Button>
                <Button>Default</Button>
              </div>
            </DashboardLayout>,
          );
        })
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
              .get("/", async ({ user, store: { db }, headers }) => {
                const r = await db.select().from(tag);
                return withLayout(
                  headers["hx-request"] === "true",
                  <DashboardLayout role={user!.role} current="/dashboard/tag">
                    <TagPage tags={r} />
                  </DashboardLayout>,
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
