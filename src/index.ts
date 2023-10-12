import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { html } from "@elysiajs/html";

import index from "@/app/page";

const app = new Elysia()
  .use(swagger())
  .use(html())
  .use(staticPlugin())
  .use(index)
  .get("/styles.css", () => Bun.file("./src/output.css"))
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
