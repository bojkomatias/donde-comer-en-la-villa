import setup from "@/routes/(setup)";
import { businessForm } from "@/db/schema/business";
import Elysia from "elysia";
import { Value } from "@sinclair/typebox/value";
import { Static } from "@sinclair/typebox";
import Business from "@/modules/business";
import { DashboardLayout } from "@/ui/dashboard/layout";
import { Layout } from "@/ui/layout";
import { Notification } from "@/ui/notification";
import { createBusiness, getBusinessesAsAdmin } from "@/services/business";
import { getUsersForSelector } from "@/services/user";

import { getTags } from "@/services/tag";

const businessRouter = new Elysia({
  name: "business",
  prefix: "/d/business",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    const businesses = await getBusinessesAsAdmin();

    return headers["hx-request"] ? (
      <DashboardLayout role={JWTUser!.role} current="/d/business">
        <Business>
          <Business.Table businesses={businesses} />
        </Business>
      </DashboardLayout>
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business>
            <Business.Table businesses={businesses} />
          </Business>
        </DashboardLayout>
      </Layout>
    );
  })

  .get("/new", async ({ JWTUser, headers }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();

    return headers["hx-request"] ? (
      <Business.Form tags={tags} users={users} />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.Form tags={tags} users={users} />
        </DashboardLayout>
      </Layout>
    );
  })
  .post(
    "/",
    async ({ body, set }) => {
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

      const businesses = await getBusinessesAsAdmin();
      return (
        <>
          <Notification
            title="Creado"
            description="Nuevo negocio creado con éxito"
          />
          <Business>
            <Business.Table businesses={businesses} />
          </Business>
        </>
      );
    },
    {
      transform: ({ body }) => {
        /** Transformation to match HTML to Insert
         * Mostly HTML returns string,
         * Here we convert types with typebox
         */
        const c = Value.Convert(businessForm, body) as Static<
          typeof businessForm
        >;
        // Object assign replaces object content body = c does not
        Object.assign(body, c);
      },
      body: businessForm,
    },
  );

export default businessRouter;
