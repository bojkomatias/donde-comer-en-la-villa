import Elysia from "elysia";
import { BusinessView } from "@/modules/business/business-view";
import { getBusinessWithRelations } from "@/services/business";
import DashboardLayout from "../../layout";

import BusinessIdRoute from "./route";
import BusinessEditPage from "./edit/page";
import BusinessHoursPage from "./hours/page";

const BusinessIdPage = new Elysia({ name: "business-id-page" })
  .use(BusinessIdRoute)
  .use(BusinessEditPage)
  .use(BusinessHoursPage)
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

export default BusinessIdPage;
