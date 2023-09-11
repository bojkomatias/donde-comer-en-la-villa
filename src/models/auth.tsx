import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { BaseHtml } from "../components/base-html";
import { Button, buttonStyles } from "../components/ui/button";
import { Input } from "../components/ui/input";
import bearer from "@elysiajs/bearer";

export const auth = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "test",
    }),
  )
  .use(bearer())
  .use(cookie())
  .model({
    auth: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .get("/sign-in", () => (
    <BaseHtml>
      <a href="/" class="float-left ml-32">
        Back
      </a>
      <div class="mx-auto mb-12 mt-32 max-w-md space-y-3">
        <p class="text-xl">Welcome back!</p>
        <p class="text-sm text-gray-600">
          Authenticate to visit your business dashboard
        </p>
      </div>
      <SignInForm />
    </BaseHtml>
  ))
  .get("/login", ({ cookie }) =>
    cookie.auth ? <LogoutButton /> : <LoginButton />,
  )
  .post(
    "/login",
    async ({ jwt, setCookie, body, set }) => {
      // fake db match
      const user = { name: "Matute", email: "matute@xd.com" };
      setCookie("auth", await jwt.sign(user), {
        httpOnly: true,
        maxAge: 7 * 86400,
      });

      return (set.redirect = "/");
    },
    { body: "auth" },
  )
  .post("/logout", async ({ removeCookie }) => {
    removeCookie("auth");
    return <LoginButton />;
  });

const SignInForm = () => {
  return (
    <form
      class="mx-auto max-w-lg"
      hx-post="/login"
      hx-target="body"
      hx-swap="outerHTML"
      hx-push-url="true"
    >
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <Input name="email" placeholder="example@example.com" />
        <Input name="password" placeholder="***********" />
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
