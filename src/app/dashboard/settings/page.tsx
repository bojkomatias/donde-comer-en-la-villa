import DashboardLayout from "@/app/dashboard/layout";
import Settings from "@/modules/settings";
import { getUserById } from "@/services/user";
import Elysia from "elysia";
import SettingsRoute from "./route";

const SettingsPage = new Elysia({
  name: "settings-page",
  prefix: "/settings",
})
  .onBeforeHandle(({ request, set }) => {
    if (request.method === "GET") {
      // Change to false, indicating data is refreshed
      set.headers["settings"] = "false";
      // Set that the request varies if the headers has changed (on post / put)
      set.headers["Vary"] = "settings, hx-request";
      // Add cache control
      set.headers["Cache-Control"] = "public, max-age=300, must-revalidate";
    }
    if (request.method === "PATCH" || request.method === "POST") {
      // Change to true, indicating resource is modified
      set.headers["settings"] = "true";
    }
  })
  .use(SettingsRoute)
  .get("/", async ({ JWTUser, headers, set }) => {
    const user = await getUserById(parseInt(JWTUser!.id));

    // See if headers vary answer with cache or not ...
    set.headers["Vary"] = "hx-target";
    return headers["hx-target"] ? (
      <Settings user={user} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <Settings user={user} />
      </DashboardLayout>
    );
  });

export default SettingsPage;
