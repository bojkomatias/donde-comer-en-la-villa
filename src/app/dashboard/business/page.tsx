import Elysia from "elysia";
import DashboardLayout from "../layout";
import { BusinessRows, BusinessTable } from "@/modules/business/business-table";
import { getBusinesses } from "@/services/business";
import businessRoute from "./route";
import businessIdPage from "./[id]/page";
import businessNewPage from "./new/page";

export default new Elysia({ name: "business-page", prefix: "/d/business" })
  .onBeforeHandle(({ request, set }) => {
    if (request.method === "GET") {
      // Change to false, indicating data is refreshed
      set.headers["business"] = "false";
      // Set that the request varies if the headers has changed (on post / put)
      set.headers["Vary"] = "business, hx-request";
      // Add cache control
      set.headers["Cache-Control"] = "public, max-age=300, must-revalidate";
    }
    if (request.method === "PUT" || request.method === "POST") {
      // Change to true, indicating resource is modified
      set.headers["business"] = "true";
    }
  })
  .use(businessRoute)
  .use(businessIdPage)
  .use(businessNewPage)
  .get("/", async ({ JWTUser, headers, set }) => {
    const businesses = await getBusinesses({});
    /**
     * For different hx-targets responses might be different,
     * Ignore caching if this header/s vary
     */

    // Extra varies on TARGET cause navigation is accesible from Dropdown AND from Navbar
    set.headers["Vary"] = "hx-target, business";

    return headers["hx-target"] ? (
      <BusinessTable>
        <BusinessRows businesses={businesses} next="/d/business/q?page=1" />
      </BusinessTable>
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessTable>
          <BusinessRows businesses={businesses} next="/d/business/q?page=1" />
        </BusinessTable>
      </DashboardLayout>
    );
  });
