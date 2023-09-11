import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { BaseHtml } from "./components/base-html";
import { business } from "./models/business";
import DarkMode from "./components/ui/dark-mode-toggle";
import { auth } from "./models/auth";
import cookie from "@elysiajs/cookie";
import { Button, buttonStyles } from "./components/ui/button";
import { Input } from "./components/ui/input";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(swagger())
  .use(cookie())
  .get("/", () => (
    <BaseHtml>
      <div class="m-6 flex items-center justify-end gap-6">
        <div hx-get="/login" hx-trigger="load" hx-swap="outerHTML" preload />
        <DarkMode />
      </div>
      <h2 class="text-center text-4xl font-semibold">
        Donde pingo se puede comer!!
      </h2>
      <p class="mb-12 text-center text-lg font-light italic">
        Estas cagado de hambre y no sabes donde mierda buscar? Llegaste al lugar
        correcto.
      </p>
      <div>
        <Input name="Search" />
      </div>
      <div hx-get="/business" hx-trigger="load" hx-swap="innerHTML"></div>
    </BaseHtml>
  ))
  .use(business)
  .use(auth)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
