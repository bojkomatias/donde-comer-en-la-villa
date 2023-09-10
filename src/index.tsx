import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { BaseHtml } from "./components/base-html";
import business from "./models/business";

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <BaseHtml>
      <div hx-get="/business" hx-trigger="load" hx-swap="innerHTML"></div>
    </BaseHtml>
  ))
  .use(business)
  .get("/output.css", () => Bun.file("./src/output.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
