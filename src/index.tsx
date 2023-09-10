import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { BaseHtml } from "./components/base-html";
import { business } from "./models/business";
import DarkMode from "./components/dark-mode-toggle";
import { auth } from "./models/auth";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(swagger())
  .get("/", () => (
    <BaseHtml>
      <DarkMode />
      <div hx-get="/business" hx-trigger="load" hx-swap="innerHTML"></div>
    </BaseHtml>
  ))
  .use(business)
  .use(auth)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
