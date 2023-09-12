import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import { setup } from "./plugins/setup";
import { authHandler } from "./plugins/auth";
import { dashboardHandler } from "./plugins/dashboard";
import { mainPlugin } from "./plugins/main";

const app = new Elysia()
  .use(staticPlugin())
  // type Setup passed to the rest of modules for inference
  .use(setup)
  // Handler modules
  .use(mainPlugin)
  .use(authHandler)
  .use(dashboardHandler)

  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
