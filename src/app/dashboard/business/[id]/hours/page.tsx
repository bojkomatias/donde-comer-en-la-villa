import DashboardLayout from "@/app/dashboard/layout";
import { BusinessHours } from "@/modules/business/business-hours";
import { getBusinessHoursByBusiness } from "@/services/business-hours";
import Elysia from "elysia";
import BusinessHoursRoute from "./route";

const BusinessHoursPage = new Elysia({ name: "business-hours-page" })
  .use(BusinessHoursRoute)
  .get("/:id/hours", async ({ token, headers, params: { id } }) => {
    const bhs = await getBusinessHoursByBusiness(parseInt(id));
    return headers["hx-request"] ? (
      <BusinessHours
        id={parseInt(id)}
        businessHours={bhs.length > 0 ? bhs : undefined}
      />
    ) : (
      <DashboardLayout token={token}>
        <BusinessHours
          id={parseInt(id)}
          businessHours={bhs.length > 0 ? bhs : undefined}
        />
      </DashboardLayout>
    );
  });

export default BusinessHoursPage;
