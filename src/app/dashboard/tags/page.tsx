import Elysia from "elysia";
import Tags from "@/modules/tag";
import { getTags } from "@/services/tag";
import DashboardLayout from "@/app/dashboard/layout";
import TagsRoute from "./route";

const TagsPage = new Elysia({
  name: "tags-page",
  prefix: "/tag",
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
  .use(TagsRoute)
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

export default TagsPage;
