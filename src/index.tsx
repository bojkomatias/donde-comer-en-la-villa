import { Elysia } from "elysia";

import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";

import { authHandler } from "./models/auth";
import { LandingPage } from "./components/landing-page";
import { profileHandler } from "./models/profile";
import cookie from "@elysiajs/cookie";

const app = new Elysia()
  .decorate("s", () => console.log("pussy"))
  .use(html())
  .use(staticPlugin())
  .use(swagger())
  .get("/", () => <LandingPage />)
  .use(authHandler)
  .use(profileHandler)
  .get('/x',({jwt})=>'s')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
