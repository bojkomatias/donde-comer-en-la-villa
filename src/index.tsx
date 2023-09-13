import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import main from "./handlers/main";
import setup from "./handlers/setup";
import auth from "./handlers/auth";
import dashboard from "./handlers/dashboard";

const app = new Elysia()
  .use(staticPlugin())
  // type Setup passed to the rest of modules for inference
  .use(setup)
  // Handler modules
  .use(main)
  .use(auth)
  .use(dashboard)

  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
