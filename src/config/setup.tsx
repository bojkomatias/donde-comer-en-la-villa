import { Elysia, t } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { helmet } from "elysia-helmet";

if (Bun.env.JWT_SECRET === undefined)
  throw "Missing secret add JWT_SECRET to .env file";

if (Bun.env.DATABASE_URL === undefined)
  throw "Missing secret add DATABASE_URL to .env file";

if (Bun.env.DATABASE_AUTH_TOKEN === undefined)
  throw "Missing secret add DATABASE_AUTH_TOKEN to .env file";

if (Bun.env.GOOGLE_CLIENT_ID === undefined)
  throw "Missing secret add CLIENT_ID to .env file";

if (Bun.env.GOOGLE_CLIENT_SECRET === undefined)
  throw "Missing secret add CLIENT_SECRET to .env file";

/**
 * Can re-use the setup plugin, even if duplicated (used only for typing)
 * Elysia has plugin checksum allowing to de-duplicate plugins on runtime
 * Here is the stuff reusable throughout the app, JWT, Cookie, User decorator (pass user)
 */

const setup = new Elysia({ name: "setup" })
  .use(helmet({ contentSecurityPolicy: false }))
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET,
      schema: t.Object({
        id: t.String(),
        email: t.String(),
        image: t.Union([t.String(), t.Null()]),
        name: t.String(),
        role: t.Required(
          t.Union([
            t.Literal("customer"),
            t.Literal("owner"),
            t.Literal("admin"),
          ]),
        ),
      }),
      exp: "7d",
    }),
  )
  // Derive user verification
  .derive(async ({ jwt, cookie }) => {
    const u = await jwt.verify(cookie.auth);
    return { JWTUser: u ? u : null };
  });

export default setup;
