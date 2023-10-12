import DashboardLayout from "@/app/dashboard/layout";
import { BusinessHours } from "@/modules/business/business-hours";
import { getBusinessHoursByBusiness } from "@/services/business-hours";
import Elysia from "elysia";
import businessHoursRoute from "./route";

export default new Elysia({ name: "business-hours-page" })
  .use(businessHoursRoute)
  .get("/:id/hours", async ({ JWTUser, headers, params: { id } }) => {
    const bhs = await getBusinessHoursByBusiness(parseInt(id));
    return headers["hx-request"] ? (
      <BusinessHours
        id={parseInt(id)}
        businessHours={bhs.length > 0 ? bhs : undefined}
      />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessHours
          id={parseInt(id)}
          businessHours={bhs.length > 0 ? bhs : undefined}
        />
      </DashboardLayout>
    );
  });
