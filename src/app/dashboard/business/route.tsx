import { businessSchema, insertBusinessForm } from "@/db/schema/business";
import { BusinessRows, BusinessTable } from "@/modules/business/business-table";
import { getBusinesses, createBusiness } from "@/services/business";
import { nextURL, querySearchParams } from "@/ui/data-table/utils";
import { Notification } from "@/ui/notification";
import Elysia, { Static } from "elysia";
import { Value } from "@sinclair/typebox/value";
import setup from "@/config/setup";

const BusinessRoute = new Elysia({ name: "business-route" })
  .use(setup)
  .get(
    "/q",
    async ({ query, set }) => {
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
            <BusinessRows businesses={businesses} next="/d/business/q?page=1" />
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
        // @ts-ignore cause this is blob, upload occurs and then handler recibes de URI
        body.image = await imageResizer(body.image, body.name).then((res) => {
          return res.image_url;
        });
      },
      body: insertBusinessForm,
    },
  );

export default BusinessRoute;
