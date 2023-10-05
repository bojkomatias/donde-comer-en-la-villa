import { Elysia } from "elysia";
import setup from "@/routes/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/settings";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";
import marketing from "./routes/marketing";
import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import users from "./routes/dashboard/users";

const app = new Elysia()
  .use(staticPlugin())
  .use(swagger())
  .use(setup)
  .use(auth)
  /** Entry point, marketing as alias to '/' */
  .use(marketing)
  /** Guard routes from dashboard plugins */
  .guard(
    {
      beforeHandle: async ({ JWTUser, set, request, headers }) => {
        if (!JWTUser) {
          set.status = 401;
          return (set.redirect = "/");
        }
      },
    },
    (app) =>
      app
        .use(profile)
        .guard(
          {
            beforeHandle: ({ JWTUser, set }) => {
              if (!(JWTUser!.role === "admin" || JWTUser!.role === "owner")) {
                set.status = 401;
                return "Unauthorized";
              }
            },
          },
          (app) => app.use(business),
        )
        .guard(
          {
            beforeHandle: ({ JWTUser, set }) => {
              if (JWTUser!.role !== "admin") {
                set.status = 401;
                return "Unauthorized";
              }
            },
          },
          (app) => app.use(tags).use(users),
        ),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
