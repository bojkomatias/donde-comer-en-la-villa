import setup from "@/config/setup";
import OAuth2 from "@/utils/oauth2";
import Elysia from "elysia";
import { createUser, getUserByEmail } from "@/services/user";
import { UserNavigation } from "@/modules/auth/user-nav";
import { LoginButton } from "@/modules/auth/login-button";

const auth = new Elysia({ name: "auth" })
  .use(setup)
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
  // This function returns auth navigation, or login button according to xd
  .get("/auth/status", ({ token, set }) => {
    if (token) return <UserNavigation user={token} />;
    return <LoginButton />;
  })
  .post("/auth/logout", ({ setCookie, set }) => {
    // Remove cookie not working
    setCookie("auth", "");
    set.redirect = "/";
  });

export default auth;
