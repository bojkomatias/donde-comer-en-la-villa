import { Elysia } from "elysia";
import setup from "@/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/profile";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";
import { Layout } from "@/components/layout";

const app = new Elysia()
  .use(setup)
  .use(auth)
  .get("/", ({ JWTUser }) => <Layout isAuth={!!JWTUser} />, {
    afterHandle: () => console.log("BEFF"),
  })
  .group(
    "/d",
    {
      beforeHandle: async ({ JWTUser, set }) => {
        if (!JWTUser) {
          set.status = 401;
          return (set.redirect = "/");
        }
      },
    },
    (app) =>
      app
        .use(profile)
        .use(business)
        .group(
          "/tag",
          {
            beforeHandle: ({ JWTUser, set }) => {
              if (JWTUser!.role !== "admin") {
                set.status = 401;
                return "Unauthorized";
              }
            },
          },
          (app) => app.use(tags),
        ),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
