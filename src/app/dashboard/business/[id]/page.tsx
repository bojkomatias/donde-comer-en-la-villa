import Elysia from "elysia";
import businessIdRoute from "./route";
import { BusinessView } from "@/modules/business/business-view";
import { getBusinessWithRelations } from "@/services/business";
import DashboardLayout from "../../layout";
import hoursPage from "./hours/page";
import editPage from "./edit/page";

export default new Elysia({ name: "business-id-page" })
  .use(businessIdRoute)
  .use(editPage)
  .use(hoursPage)
  .get("/:id", async ({ JWTUser, headers, params: { id }, set }) => {
    const business = await getBusinessWithRelations(parseInt(id));

    return headers["hx-request"] ? (
      <BusinessView business={business} asAdmin={JWTUser?.role === "admin"} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessView business={business} asAdmin={JWTUser?.role === "admin"} />
      </DashboardLayout>
    );
  });
