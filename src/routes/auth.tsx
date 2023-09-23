import { randomBytes } from "crypto";
import setup from "@/routes/(setup)";
import OAuth2 from "@/utils/oauth2";
import Elysia from "elysia";
import { Notification } from "@/ui/notification";
import Auth from "@/modules/auth";
import {
  createUser,
  getUserByEmail,
  userMatchCredentials,
} from "@/services/user";
import { Layout } from "@/ui/layout";

const hasher = new Bun.CryptoHasher("sha256");

const auth = new Elysia({ name: "auth" })
  .use(setup)
  .get("/login", async ({ setCookie, headers, JWTUser, set }) => {
    // If already logged in kick
    if (JWTUser) return (set.redirect = "/");

    /** Implements double submit cookies method for protection against CSRF */
    hasher.update(randomBytes(100));
    const csrfToken = hasher.digest("base64");
    setCookie("csrfToken", csrfToken, {
      secure: true,
      sameSite: true,
    });

    return headers["hx-request"] ? (
      <Auth.Form csrfToken={csrfToken} />
    ) : (
      <Layout>
        <Auth.Form csrfToken={csrfToken} />
      </Layout>
    );
  })
  .post(
    "/auth/login",
    async ({ jwt, cookie, setCookie, body, set }) => {
      // Catch CSRF attack
      if (cookie.csrfToken !== body.csrfToken) return (set.status = 403);

      const user = await userMatchCredentials(body.email, body.password);

      // Handle incorrect username or password
      if (!user) {
        set.status = 404;
        return (
          <Notification
            title={"Error"}
            description={"Incorrect username or password"}
            isError
          />
        );
      }

      setCookie(
        "auth",
        await jwt.sign({
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }),
        {
          httpOnly: true,
        },
      );

      set.redirect = "/";
    },
    { body: "auth" },
  )
  .get("/auth/callback/google", async ({ query, setCookie, jwt, set }) => {
    const oauth_user = await OAuth2(query["code"] as string);

    // Check if user exists in DB
    let user = await getUserByEmail(oauth_user.email);

    // If not create it
    if (!user) {
      user = await createUser({ ...oauth_user, image: oauth_user.picture });
    }
    // Set cookie
    setCookie(
      "auth",
      await jwt.sign({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      }),
      {
        httpOnly: true,
      },
    );

    set.redirect = "/";
  })
  .get("/auth/status", ({ JWTUser, set }) => {
    if (JWTUser) return (set.redirect = "/auth/navigation");
    return <Auth.Login />;
  })
  .get(
    "/auth/navigation",
    ({ JWTUser }) => <Auth.Navigation user={JWTUser} />,
    {
      beforeHandle: ({ JWTUser, set }) => {
        if (!JWTUser) {
          set.status = 401;
          return "Unauthorized";
        }
      },
    },
  )
  .post("/auth/logout", ({ setCookie, set }) => {
    // Remove cookie not working
    setCookie("auth", "");
    return (set.redirect = "/");
  });

export default auth;
