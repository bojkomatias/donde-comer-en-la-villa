import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import main from "./handlers/main";
import setup from "./handlers/setup";
import auth from "./handlers/auth";
import dashboard from "./handlers/dashboard";
import { Notification } from "./components/ui/notification";

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
  // Handler modules
  .use(main)
  .use(auth)
  .use(dashboard)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
