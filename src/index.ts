import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import staticPlugin from "@elysiajs/static";

import index from "@/app/page";

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(index)
  .get("/styles.css", () => Bun.file("./src/output.css"))
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
