import setup from "@/(setup)";
import Business from "@/components/business";
import DashboardLayout from "@/components/dashboard-layout";
import { Layout } from "@/components/layout";
import { db } from "@/db";
import { business, businessForm } from "@/db/schema/business";
import Elysia from "elysia";
import { Value } from "@sinclair/typebox/value";
import { eq, getTableColumns } from "drizzle-orm";
import { user } from "@/db/schema/user";
import { tagToBusiness } from "@/db/schema/tag";

const businessRouter = new Elysia({
  name: "business",
  prefix: "/business",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    const { id, name, phone, featured, userId, ...rest } =
      getTableColumns(business);
    const r = await db
      .select({ id, name, phone, featured, owner: user.name })
      .from(business)
      .leftJoin(user, eq(business.userId, user.id));

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

  .get("/new", ({ JWTUser, headers }) =>
    headers["hx-request"] ? (
      <Business.Form
        tags={[
          { id: 1, name: "Hambur" },
          { id: 2, name: "Sand" },
        ]}
        users={[{ id: 1, name: "Matias bojko" }]}
      />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.Form
            tags={[
              { id: 1, name: "Hambur" },
              { id: 2, name: "Sand" },
            ]}
            users={[{ id: 1, name: "Matias bojko" }]}
          />
        </DashboardLayout>
      </Layout>
    ),
  )

  .post(
    "/",
    async ({ body }) => {
      // const { tags, ...rest } = body;
      // const r = await db
      //   .insert(business)
      //   .values(rest)
      //   .returning({ id: business.id });
      // if (tags) {
      //   const t_b_values = tags?.map((e) => ({
      //     businessId: r[0].id,
      //     tagId: e,
      //   }));
      //   const _r = await db.insert(tagToBusiness).values(t_b_values);
      // }
    },
    {
      transform: ({ body }) => {
        const c = Value.Convert(businessForm, body) as any;
        body.featured = c.featured;
        body.tags = c.tags.map((e: string) => Number(e));
        body.userId = c.userId;
        console.log(c);
      },
      body: businessForm,
    },
  );

export default businessRouter;
