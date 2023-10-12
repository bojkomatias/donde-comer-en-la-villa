import { insertBusinessHours } from "@/db/schema/business-hours";
import { BusinessView } from "@/modules/business/business-view";
import setup from "@/config/setup";
import { getBusinessWithRelations } from "@/services/business";
import { upsertBusinessHours } from "@/services/business-hours";
import { Notification } from "@/ui/notification";
import Elysia, { t } from "elysia";

const BusinessHoursRoute = new Elysia({ name: "business-hours-route" })
  .use(setup)
  .post(
    "/:id",
    async ({ JWTUser, body: { businessHours }, set }) => {
      const ra = await upsertBusinessHours(businessHours);
      if (!ra[0]) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ocurrió un error al actualizar tus horarios de atención"
          />
        );
      }

      const business = await getBusinessWithRelations(ra[0].id);

      set.redirect = `/d/business/${ra[0].id}`;
      return (
        <>
          <Notification
            title="Horarios configurados"
            description="Se actualizaron tus horarios de atención"
          />
          <BusinessView
            business={business}
            asAdmin={JWTUser?.role === "admin"}
          />
        </>
      );
    },
    {
      transform: ({ body }) => {
        const bodyEntries = Object.entries(body!);
        const businessHours: any = [];
        const days = [0, 1, 2, 3, 4, 5, 6];
        days.forEach((day) => {
          // @ts-ignore
          const [a, b, c, opens, d, closes] = bodyEntries
            .filter(([a, _]) => a.includes(day.toString()))
            .flat();

          if (opens)
            businessHours.push({
              // @ts-ignore I know what the form returns, mapping it here
              business: parseInt(body.business),
              day,
              opens,
              closes,
            });
        });
        for (const key in body) {
          // @ts-ignore Need to use same body obj ...
          delete body[key];
        }
        Object.assign(body, { businessHours });
      },
      body: t.Object({ businessHours: t.Array(insertBusinessHours) }),
    },
  );

export default BusinessHoursRoute;
