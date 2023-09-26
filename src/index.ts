import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import setup from "@/routes/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/settings";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";
import marketing from "./routes/marketing";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(setup)
  .use(auth)
  /** Entry point, marketing as alias to '/' */
  .use(marketing)
  /** Guard routes from plugins */
  .guard(
    {
      beforeHandle: async ({ JWTUser, set, request, headers }) => {
        if (!JWTUser) {
          set.status = 401;
          return (set.redirect = "/");
        }
        if (
          request.method === "GET" &&
          headers["hx-request"] &&
          headers["hx-target"] === "dashboard-content"
        )
          set.headers["Cache-Control"] =
            "public, max-age=60, must-revalidate, stale-while-revalidate=10";
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
          (app) => app.use(tags),
        ),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
