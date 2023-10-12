import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import swagger from "@elysiajs/swagger";
import { html } from "@elysiajs/html";

import auth from "./app/auth/route";

import marketing from "@/app/page";
import businessPage from "@/app/dashboard/business/page";
import settingsPage from "@/app/dashboard/settings/page";
import tagsPage from "@/app/dashboard/tags/page";
import usersPage from "@/app/dashboard/users/page";

const app = new Elysia()
  .use(swagger())
  .use(html())
  .use(staticPlugin())
  .use(auth)
  .use(marketing)
  .use(businessPage)
  .use(settingsPage)
  .use(tagsPage)
  .use(usersPage)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
