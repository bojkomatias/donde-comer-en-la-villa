import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const auth = new Elysia({ prefix: "/prefix" })
  .use(
    jwt({
      name: "jwt",
      secret: "test",
    }),
  )
  .use(cookie())
  .get("/sign/:name", async ({ jwt, cookie, setCookie, params }) => {
    setCookie("auth", await jwt.sign(params), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });

    return `Sign in as ${cookie.auth}`;
  })
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }
    return `Hello ${JSON.stringify(profile)}`;
  });
