import { withLayout } from "@/components/layout";
import { user } from "@/db/schema/user";
import setup from "@/(setup)";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import DashboardLayout from "../../components/dashboard-layout";
import Profile from "@/components/profile";
import { db } from "@/db";

const profile = new Elysia({
  name: "profile",
})
  .use(setup)
  .get("/", async ({ user: u, headers }) => {
    const r = await db
      .select()
      .from(user)
      .where(eq(user.id, Number(u?.id)));
    return withLayout(
      headers["hx-request"] === "true",
      <DashboardLayout role={r[0].role} current="/d">
        <Profile user={r[0]} />
      </DashboardLayout>,
    );
  })
  .get("/:id/:attr", ({ params: { id, attr }, query }) => (
    <Profile.Attribute id={id} attribute={attr} value={query.value as string} />
  ))
  .get("/:id/:attr/edit", ({ params: { id, attr }, query }) => (
    <Profile.AttributeEdit
      id={id}
      attribute={attr}
      value={query.value as string}
    />
  ))
  .patch("/:id", async ({ params: { id }, body }) => {
    const [attr, val] = Object.entries(
      body as { [key: string]: string },
    ).flat();
    const r = await db
      .update(user)
      .set({ [attr]: val })
      .where(eq(user.id, Number(id)))
      // @ts-ignore I know that I'm passing a safe key like 'name'
      .returning({ [attr]: user[attr] });

    return <Profile.Attribute id={id} attribute={attr} value={r[0][attr]} />;
  })
  .patch(
    "/password",
    async ({ user: u, body, set }) => {
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
  );

export default profile;
