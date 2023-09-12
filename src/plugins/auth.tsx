import { Button, buttonStyles } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { randomBytes } from "crypto";
import { user } from "../db/schema/user";
import { and, eq } from "drizzle-orm";
import { Setup } from "./setup";

const hasher = new Bun.CryptoHasher("sha256");

export const authHandler = (app: Setup) =>
  app.group("/auth", (app) =>
    app
      /** Get auth form */
      .get("/form", async ({ setCookie }) => {
        /** Implements double submit cookies method for protection against CSRF */
        hasher.update(randomBytes(100));
        const csrfToken = hasher.digest("base64");
        setCookie("csrfToken", csrfToken, {
          secure: true,
          sameSite: true,
        });

        return <SignInForm csrfToken={csrfToken} />;
      })
      .post(
        "/login",
        async ({ jwt, cookie, setCookie, body, set, store: { db } }) => {
          // Catch CSRF attack
          if (cookie.csrfToken !== body.csrfToken) return (set.status = 403);

          // Check if credentials match
          const [result] = await db
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
            .limit(1);

          // Handle incorrect username or password
          if (!result) {
            set.status = 404;
            return (
              <div class="text-sm text-red-600">
                * Incorrect email or password
              </div>
            );
          }

          setCookie(
            "auth",
            await jwt.sign({
              id: String(result.id),
              name: result.name,
              email: result.email,
              role: result.role,
            }),
            {
              httpOnly: true,
              maxAge: 7 * 86400,
            },
          );

          return (set.redirect = "/");
        },
        { body: "auth" },
      )

      .post("/logout", ({ setCookie, set }) => {
        // Remove cookie not working
        setCookie("auth", "");
        return (set.redirect = "/");
      }),
  );

const SignInForm = (props: { csrfToken: string }) => {
  return (
    <div class="mx-auto max-w-xl space-y-8 pt-40" hx-target="this">
      <Button hx-get="/" hx-swap="outerHTML">
        <i class="i-lucide-chevron-left" />
        Back
      </Button>
      <p class="text-xl">Welcome back!</p>
      <p class="text-sm text-gray-600">
        Authenticate to visit your business dashboard
      </p>
      <form
        hx-post="/auth/login"
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
          <Button class="flex-grow" disabled="true">
            Crear cuenta
          </Button>
        </div>

        <div id="not-found" />
      </form>
    </div>
  );
};

export const LoginButton = () => (
  <Button
    hx-get="/auth/form"
    hx-target="body"
    hx-swap="innerHTML"
    intent="primary"
    style="view-transition-name: sign"
  >
    Log In
  </Button>
);
export const NavMenu = () => (
  <div
    id="menu"
    class="relative inline-block text-left"
    hx-target="body"
    hx-swap="innerHTML"
  >
    <div>
      <Button
        _="on click toggle .hidden on #dropdown end
        on keyup
         if the event's key is 'Escape'
           add .hidden to #dropdown
           trigger keyup
        end"
        intent="primary"
      >
        Menu
        <i class="i-lucide-chevron-down" />
      </Button>
    </div>

    <div
      id="dropdown"
      role="menu"
      class="absolute right-0 z-10 mt-2 hidden w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div class="py-1" role="none">
        <a
          href="/"
          hx-push-url="true"
          class="block px-4 py-2 text-sm hover:bg-black/5"
        >
          Home
        </a>

        <a
          href="/dashboard"
          hx-push-url="true"
          class="block px-4 py-2 text-sm hover:bg-black/5"
        >
          Dashboard
        </a>

        <button
          hx-post="/auth/logout"
          hx-push-url="true"
          class="block w-full px-4 py-2 text-left text-sm hover:bg-black/5"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);
