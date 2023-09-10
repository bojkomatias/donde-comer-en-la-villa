import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { staticPlugin } from "@elysiajs/static";

import { BaseHtml } from "./components/base-html";
import business from "./models/business";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => (
    <BaseHtml>
      <div hx-get="/business" hx-trigger="load" hx-swap="innerHTML"></div>
    </BaseHtml>
  ))
  .use(business)
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    })
  )
  .use(cookie())
  .get("/sign/:name", async ({ jwt, cookie, setCookie, params }) => {
    setCookie(
      "auth",
      await jwt.sign({ name: "matue", password: "bojkomatias" }),
      {
        httpOnly: true,
        maxAge: 7 * 86400,
      }
    );

    return `Sign in as ${cookie.auth}`;
  })
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }
    return `Hello ${JSON.stringify(profile)}`;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
