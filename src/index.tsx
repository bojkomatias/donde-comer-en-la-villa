import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import setup from "@/routes/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/profile";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";
import { Layout } from "@/ui/layout";
import {swagger} from "@elysiajs/swagger"

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(setup)
  .use(auth)
  .onRequest(({ request, set }) => {
    // Only cache GET and Hx-Requests (this avoids refresh issues)
    if (request.method === "GET" && request.headers.get("hx-request")) {
      set.headers["Cache-Control"] = "public, max-age=60, must-revalidate";
    }
  })
  /** Entry point */
  .get("/", ({ JWTUser }) => <Layout isAuth={!!JWTUser} />)
  /** Guard routes from plugins */
  .guard(
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
