import Elysia, { t } from "elysia";
import { db } from "../db";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import html from "@elysiajs/html";
import bearer from "@elysiajs/bearer";

if (Bun.env.SECRET === undefined)
  throw "Missing secret add SECRET to .env file";

/**
 * Can re-use the setup plugin, even if duplicated (used only for typing)
 * Elysia has plugin checksum allowing to de-duplicate plugins on runtime
 * Here is the stuff reusable throughout the app, JWT, Cookie, Model, DB connection.
 */
export const setup = new Elysia({ name: "setup" })
  .use(html())
  .use(bearer())
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.SECRET,
      schema: t.Object({
        id: t.String(),
        email: t.String(),
        name: t.String(),
        role: t.Required(
          t.Union([
            t.Literal("customer"),
            t.Literal("owner"),
            t.Literal("admin"),
          ]),
        ),
      }),
    }),
  )
  .model({
    auth: t.Object({
      email: t.String(),
      password: t.String(),
      csrfToken: t.String(),
    }),
  })
  // Pass DB connection
  .state("db", db)
  // Derive user verification
  .derive(async ({ jwt, cookie }) => {
    const u = await jwt.verify(cookie.auth);
    return { user: u ? u : null };
  });

export type Setup = typeof setup;
