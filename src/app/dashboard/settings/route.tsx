import { InsertUser, userSchema } from "@/db/schema/user";
import Profile from "@/modules/settings/profile";
import setup from "@/config/setup";
import { getUserById, updateUserAttribute } from "@/services/user";
import { Notification } from "@/ui/notification";
import Elysia, { t } from "elysia";

export default new Elysia({
  name: "settings-route",
})
  .use(setup)
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
