import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import setup from "@/(setup)";
import auth from "@/routes/auth";
import profile from "@/routes/dashboard/profile";
import tags from "@/routes/dashboard/tags";
import business from "@/routes/dashboard/business";

import { Layout } from "@/components/layout";
import { Notification } from "@/components/ui/notification";
import NotFound from "./components/404-not-found";

const app = new Elysia()
  .use(staticPlugin())
  .use(setup)
  .use(auth)
  .get("/", ({ user }) => <Layout isAuth={!!user} />)
  .group(
    "/dashboard",
    {
      beforeHandle: async ({ user, set }) => {
        if (!user) {
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
            beforeHandle: ({ user, set }) => {
              if (user!.role !== "admin") {
                set.status = 401;
                return "Unauthorized";
              }
            },
          },
          (app) => app.use(tags),
        ),
  )
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION")
      return (
        <Notification
          title={error.name}
          description={error.all.map((e) => e.schema.error).join("<br/>")}
          icon="i-lucide-x-circle text-red-500"
        />
      );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
