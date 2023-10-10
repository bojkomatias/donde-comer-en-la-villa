import setup from "@/routes/(setup)";
import { businessSchema, insertBusinessForm } from "@/db/schema/business";
import Elysia, { t } from "elysia";
import { Value } from "@sinclair/typebox/value";
import { Static } from "@sinclair/typebox";
import { DashboardLayout } from "@/ui/dashboard/layout";
import { Notification } from "@/ui/notification";
import {
  createBusiness,
  getBusinessById,
  getBusinessWithRelations,
  getBusinesses,
  updateBusiness,
} from "@/services/business";
import { getUsersForSelector } from "@/services/user";

import { getTags } from "@/services/tag";
import { getTagsByBusinessId } from "@/services/tag-to-business";
import { BusinessRows, BusinessTable } from "@/modules/business/business-table";
import { BusinessView } from "@/modules/business/business-view";
import { BusinessNew } from "@/modules/business/business-new";
import { BusinessEdit } from "@/modules/business/business-edit";
import { nextURL, querySearchParams } from "@/ui/data-table/utils";
import { insertBusinessHours } from "@/db/schema/business-hours";
import { BusinessHours } from "@/modules/business/business-hours";
import {
  getBusinessHoursByBusiness,
  upsertBusinessHours,
} from "@/services/business-hours";
import imageResizer from "@/utils/image-resize";

const business = new Elysia({
  name: "business",
  prefix: "/d/business",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers, set }) => {
    const businesses = await getBusinesses({});
    /**
     * For different hx-targets responses might be different,
     * Ignore caching if this header/s vary
     */
    set.headers["Vary"] = "hx-target";
    return headers["hx-target"] ? (
      <BusinessTable>
        <BusinessRows businesses={businesses} next="" />
      </BusinessTable>
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessTable>
          <BusinessRows businesses={businesses} next="" />
        </BusinessTable>
      </DashboardLayout>
    );
  })
  .get(
    "/q",
    async ({ query }) => {
      const businesses = await getBusinesses(query);
      return (
        <BusinessRows
          businesses={businesses}
          next={nextURL("/d/business/q", query)}
        />
      );
    },
    {
      query: querySearchParams(businessSchema),
    },
  )
  .get("/:id", async ({ JWTUser, headers, params: { id } }) => {
    const business = await getBusinessWithRelations(parseInt(id));

    return headers["hx-request"] ? (
      <BusinessView business={business} asAdmin={JWTUser?.role === "admin"} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessView business={business} asAdmin={JWTUser?.role === "admin"} />
      </DashboardLayout>
    );
  })
  .put(
    "/:id",
    async ({ body, set, params: { id }, JWTUser }) => {
      const updated = await updateBusiness(parseInt(id), body);

      if (!updated) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ocurrió un error al actualizar el negocio"
          />
        );
      }

      const business = await getBusinessWithRelations(parseInt(id));

      return (
        <>
          <Notification
            title="Actualizado"
            description="Negocio actualizado con éxito"
          />
          <BusinessView
            business={business}
            asAdmin={JWTUser?.role === "admin"}
          />
        </>
      );
    },
    {
      transform: async ({ body }) => {
        /** Transformation to match HTML to Insert
         * Mostly HTML returns string,
         * Here we convert types with typebox
         */
        const c = Value.Convert(insertBusinessForm, body) as Static<
          typeof insertBusinessForm
        >;
        // Object assign replaces object content body = c does not
        Object.assign(body, c);
        body.tags = [body.tags].flat().map((e: any) => JSON.parse(e));
        //Resizes the image to make it lighter
        body.image = await imageResizer(body.image, body.name).then((res) => {
          return res.image_url; 
        });
      },
      body: insertBusinessForm,
    },
  )
  .get("/:id/edit", async ({ JWTUser, headers, params: { id } }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();
    const business = await getBusinessById(parseInt(id));
   
    // Add tags from relation
    business.tags = (await getTagsByBusinessId(business.id)).map(
      (e) => e.tagId,
    );

    return headers["hx-request"] ? (
      <BusinessEdit
        tags={tags}
        users={users}
        business={business}
        asAdmin={JWTUser?.role === "admin"}
      />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessEdit
          tags={tags}
          users={users}
          business={business}
          asAdmin={JWTUser?.role === "admin"}
        />
      </DashboardLayout>
    );
  })
  .get("/new", async ({ JWTUser, headers }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();

    return headers["hx-request"] ? (
      <BusinessNew
        tags={tags}
        users={users}
        asAdmin={JWTUser?.role === "admin"}
        ownerId={JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined}
      />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessNew
          tags={tags}
          users={users}
          asAdmin={JWTUser?.role === "admin"}
          ownerId={JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined}
        />
      </DashboardLayout>
    );
  })
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
  })
  .post(
    "/",
    async ({ body, set, JWTUser }) => {
      const created = await createBusiness(body);

      if (!created) {
        set.status = 403;
        return (
          <Notification
            isError
            title="Error"
            description="Ocurrió un error al crear el negocio"
          />
        );
      }

      const businesses = await getBusinesses({});
      return (
        <>
          <Notification
            title="Negocio creado"
            description="Nuevo negocio creado con éxito"
          />
          <BusinessTable>
            <BusinessRows businesses={businesses} next="" />
          </BusinessTable>
        </>
      );

    
    },
    {
      transform: async ({ body }) => {
        /** Transformation to match HTML to Insert
         * Mostly HTML returns string,
         * Here we convert types with typebox
         */

        const c = Value.Convert(insertBusinessForm, body) as Static<
          typeof insertBusinessForm
        >;
        // Object assign replaces object content body = c does not
        Object.assign(body, c);
        body.tags = [body.tags].flat().map((e: any) => JSON.parse(e));
        //Resizes the image to make it lighter
        body.image = await imageResizer(body.image, body.name).then((res) => {
          return res.image_url; 
        });
      },
      body: insertBusinessForm,
    },
  )
  // Post the business hours!
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

export default business;
