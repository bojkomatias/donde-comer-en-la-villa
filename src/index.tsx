import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import setup from "@/routes/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/profile";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";
import { Layout } from "@/ui/layout";


const app = new Elysia()
  .use(staticPlugin())
  .use(setup)
  .use(auth)
  /** Entry point */
  .get("/", ({ JWTUser }) => <Layout isAuth={!!JWTUser} />)
  /** Dashboard group /d as a shorthand */
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
