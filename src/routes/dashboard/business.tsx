import setup from "@/(setup)";
import { db } from "@/db";
import { business, businessForm } from "@/db/schema/business";
import Elysia from "elysia";
import { Value } from "@sinclair/typebox/value";
import { eq, getTableColumns } from "drizzle-orm";
import { user } from "@/db/schema/user";
import { Static } from "@sinclair/typebox";
import { tag, tagToBusiness } from "@/db/schema/tag";
import Business from "@/modules/business";
import {DashboardLayout} from "@/ui/dashboard/layout";
import { Layout } from "@/ui/layout";
import { Notification } from "@/ui/notification";


const businessRouter = new Elysia({
  name: "business",
  prefix: "/business",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    const { id, name, phone, featured, enabled } = getTableColumns(business);
    const r = await db
      .select({ id, name, phone, featured, enabled })
      .from(business)
      .leftJoin(user, eq(business.owner, user.id));

    return headers["hx-request"] ? (
      <DashboardLayout role={JWTUser!.role} current="/d/business">
        <Business>
          <Business.Table businesses={r} />
        </Business>
      </DashboardLayout>
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business>
            <Business.Table businesses={r} />
          </Business>
        </DashboardLayout>
      </Layout>
    );
  })

  .get("/new", async ({ JWTUser, headers }) => {
    const tags = await db.select().from(tag);
    const users = await db.select({ id: user.id, name: user.name }).from(user);
    return headers["hx-request"] ? (
      <Business.Form tags={tags} users={users} />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.Form tags={tags} users={users} />
        </DashboardLayout>
      </Layout>
    );
  })
  .post(
    "/",
    async ({ body }) => {
      const { tags, ...rest } = body;
      const r = await db
        .insert(business)
        .values(rest)
        .returning({ id: business.id });
      if (tags) {
        const t_b_values =
          typeof tags === "number"
            ? [
                {
                  businessId: r[0].id,
                  tagId: tags,
                },
              ]
            : tags?.map((e) => ({
                businessId: r[0].id,
                tagId: e,
              }));
        await db.insert(tagToBusiness).values(t_b_values);
      }

      const { id, name, phone, featured, enabled } = getTableColumns(business);
      const s = await db
        .select({ id, name, phone, featured, enabled })
        .from(business)
        .leftJoin(user, eq(business.owner, user.id));

      return (
        <>
          <Notification
            title="Creado"
            description="Nuevo negocio creado con éxito"
          />
          <Business>
            <Business.Table businesses={s} />
          </Business>
        </>
      );
    },
    {
      transform: ({ body }) => {
        const c = Value.Convert(businessForm, body) as Static<
          typeof businessForm
        >;
        Object.assign(body, c);
      },
      body: businessForm,
    },
  );

export default businessRouter;
