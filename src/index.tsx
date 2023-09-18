import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import setup from "./(setup)";
import auth from "./routes/auth";
import { Notification } from "./components/ui/notification";
import { profile } from "./routes/dashboard/profile";
import { tags } from "./routes/dashboard/tags";
import { Layout } from "./components/layout";

const app = new Elysia()
  .use(staticPlugin())
  // type Setup passed to the rest of modules for inference
  .use(setup)
  .onError(({ code, error }) => {
    console.log(error.message);
    if (code === "VALIDATION")
      return (
        <Notification
          title={error.name}
          description={error.all.map((e) => e.schema.error).join("<br/>")}
          icon="i-lucide-x-circle text-red-500"
        />
      );
  })

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
    (app) => app.use(profile).use(tags),
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
