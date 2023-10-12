import Elysia from "elysia";
import Tags from "@/modules/tag";
import { getTags } from "@/services/tag";
import DashboardLayout from "@/app/dashboard/layout";
import tagsRoute from "./route";

export default new Elysia({
  name: "tags-page",
  prefix: "/d/tag",
})
  .onBeforeHandle(({ request, set }) => {
    if (request.method === "GET") {
      // Change to false, indicating data is refreshed
      set.headers["tags"] = "false";
      // Set that the request varies if the headers has changed (on post / put)
      set.headers["Vary"] = "tags, hx-request";
      // Add cache control
      set.headers["Cache-Control"] = "public, max-age=300, must-revalidate";
    }
    if (request.method === "PUT" || request.method === "POST") {
      // Change to true, indicating resource is modified
      set.headers["tags"] = "true";
    }
  })
  .use(tagsRoute)
  .get("/", async ({ JWTUser, headers }) => {
    const tags = await getTags();

    return headers["hx-request"] ? (
      <Tags tags={tags} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <Tags tags={tags} />
      </DashboardLayout>
    );
  });
