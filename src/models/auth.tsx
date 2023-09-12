import cookie from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { BaseHtml } from "../components/base-html";
import { Button, buttonStyles } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { randomBytes } from "crypto";

import { ChevronLeft } from "../components/ui/icons";
import { db } from "../db";
import { user } from "../db/schema/user";
import { and, eq } from "drizzle-orm";

if (Bun.env.SECRET === undefined)
  throw "Missing secret add SECRET to .env file";

const hasher = new Bun.CryptoHasher("sha256");

export const authHandler = new Elysia({ name: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.SECRET,
    }),
  )
  .use(cookie())
  .model({
    auth: t.Object({
      email: t.String(),
      password: t.String(),
      csrfToken: t.String(),
    }),
  })
  /**Sign In page */
  .get("/sign-in", async ({ setCookie }) => {
    /** Implements double submit cookies method for protection against CSRF */
    hasher.update(randomBytes(100));
    const csrfToken = hasher.digest("base64");
    setCookie("csrfToken", csrfToken, {
      secure: true,
      sameSite: true,
    });

    return (
      <BaseHtml>
        <div class="mx-auto max-w-xl space-y-6 pt-32">
          <a
            href="/"
            class="flex w-fit items-center opacity-75 hover:opacity-100"
          >
            <ChevronLeft />
            <span class="mt-1">Back</span>
          </a>
          <p class="text-xl">Welcome back!</p>
          <p class="text-sm text-gray-600">
            Authenticate to visit your business dashboard
          </p>
          <SignInForm csrfToken={csrfToken} />
        </div>
      </BaseHtml>
    );
  })
  /** Login button or Logout button */
  .get("/login", ({ cookie }) =>
    cookie.auth ? <LogoutButton /> : <LoginButton />,
  )
  .post(
    "/login",
    async ({ jwt, cookie, setCookie, body, set }) => {
      // Catch CSRF attack
      if (cookie.csrfToken !== body.csrfToken) return (set.status = 403);

      // Check if credentials match
      const result = db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
        .from(user)
        .where(
          and(eq(user.email, body.email), eq(user.password, body.password)),
        )
        .get();
      // Handle incorrect username or password
      if (!result) {
        set.status = 404;
        return (
          <div
            class="text-sm text-red-600"
            _="on load wait 5s then transition opacity to 0 then remove me"
          >
            * Incorrect email or password
          </div>
        );
      }

      setCookie(
        "auth",
        await jwt.sign({ ...result, id: result.id.toString() }),
        {
          httpOnly: true,
          maxAge: 7 * 86400,
        },
      );
      return (set.redirect = "/");
    },
    { body: "auth" },
  )
  .post("/logout", async ({ removeCookie }) => {
    removeCookie("auth");
    return <LoginButton />;
  });

const SignInForm = (props: { csrfToken: string }) => {
  return (
    <form
      hx-post="/login"
      hx-target="body"
      hx-target-404="#not-found"
      hx-swap="outerHTML"
    >
      <input
        type="text"
        name="csrfToken"
        value={props.csrfToken}
        class="hidden"
      />
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <Input name="email" placeholder="example@example.com" type="email" />
        <Input name="password" placeholder="***********" type="password" />
      </div>
      <div class="m-4 flex gap-6">
        <Button
          intent="primary"
          class="flex-grow"
          style="view-transition-name: sign"
        >
          Log In
        </Button>
        <Button class="flex-grow">Crear cuenta</Button>
      </div>

      <div id="not-found" />
    </form>
  );
};

const LoginButton = () => (
  <a
    hx-get="/sign-in"
    hx-push-url="true"
    hx-target="body"
    hx-swap="outerHTML"
    class={buttonStyles({ intent: "primary" })}
    style="view-transition-name: sign"
  >
    Log In
  </a>
);
const LogoutButton = () => (
  <Button
    hx-post="/logout"
    hx-target="this"
    hx-swap="outerHTML"
    intent="secondary"
  >
    Logout
  </Button>
);
