import { InsertUser, userSchema } from "@/db/schema/user";
import Profile from "@/modules/profile";
import setup from "@/routes/(setup)";
import { getUserById, updateUserAttribute } from "@/services/user";
import { DashboardLayout } from "@/ui/dashboard/layout";
import { Layout } from "@/ui/layout";
import { Notification } from "@/ui/notification";
import Elysia, { t } from "elysia";

const profile = new Elysia({
  name: "profile",
  prefix: "/d",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    const user = await getUserById(parseInt(JWTUser!.id));

    return headers["hx-request"] ? (
      <DashboardLayout role={user.role} current="/d">
        <Profile user={user} />
      </DashboardLayout>
    ) : (
      <Layout>
        <DashboardLayout role={user.role} current="/d">
          <Profile user={user} />
        </DashboardLayout>
      </Layout>
    );
  })
  .get("/:id/:attr", ({ params: { id, attr }, query }) => (
    <Profile.Attribute
      id={id}
      attribute={attr as keyof InsertUser}
      value={query.value as string}
    />
  ))
  .get("/:id/:attr/edit", ({ params: { id, attr }, query }) => (
    <Profile.AttributeEdit
      id={id}
      attribute={attr as keyof InsertUser}
      value={query.value as string}
    />
  ))
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      const [attr, value] = Object.entries(body).flat() as [
        attr: keyof InsertUser,
        value: string | number | null,
      ];
      const r = await updateUserAttribute(parseInt(id), attr, value);
      return <Profile.Attribute id={id} attribute={attr} value={r} />;
    },
    { body: t.Partial(userSchema) },
  )
  .patch(
    "/password",
    async ({ JWTUser, body, set }) => {
      const { password } = await getUserById(parseInt(JWTUser!.id));

      if (password !== body.currentPassword) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Las contraseñas no coinciden"
          />
        );
      }

      await updateUserAttribute(
        parseInt(JWTUser!.id),
        "password",
        body.password,
      );

      return (
        <Notification
          title="Actualizado"
          description="La contraseña fue actualizada"
        />
      );
    },
    {
      body: t.Object({
        currentPassword: t.String(),
        password: t.String(),
      }),
    },
  );

export default profile;
