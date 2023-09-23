import setup from "@/routes/(setup)";
import { insertBusinessForm } from "@/db/schema/business";
import Elysia from "elysia";
import { Value } from "@sinclair/typebox/value";
import { Static } from "@sinclair/typebox";
import Business from "@/modules/business";
import { DashboardLayout } from "@/ui/dashboard/layout";
import { Layout } from "@/ui/layout";
import { Notification } from "@/ui/notification";
import {
  createBusiness,
  getBusinessById,
  getBusinessByIdWithOwner,
  getBusinessesAsAdmin,
  getBusinessesAsOwner,
  updateBusiness,
} from "@/services/business";
import { getUsersForSelector } from "@/services/user";

import { getTags } from "@/services/tag";
import { getTagsByBusinessId } from "@/services/tag-to-business";

const businessRouter = new Elysia({
  name: "business",
  prefix: "/d/business",
})
  .use(setup)
  .get("/", async ({ JWTUser, headers }) => {
    if (JWTUser?.role === "owner") {
      const [business] = await getBusinessesAsOwner(parseInt(JWTUser.id));

      return headers["hx-request"] ? (
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.View business={business} />
        </DashboardLayout>
      ) : (
        <Layout>
          <DashboardLayout role={JWTUser!.role} current="/d/business">
            <Business.View business={business} />
          </DashboardLayout>
        </Layout>
      );
    }
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
  .get("/:id", async ({ JWTUser, headers, params: { id } }) => {
    const business = await getBusinessByIdWithOwner(parseInt(id));
    console.log(headers);
    return headers["hx-request"] ? (
      <Business.View business={business} asAdmin={JWTUser?.role === "admin"} />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.View
            business={business}
            asAdmin={JWTUser?.role === "admin"}
          />
        </DashboardLayout>
      </Layout>
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

      const business = await getBusinessByIdWithOwner(parseInt(id));

      return (
        <>
          <Notification
            title="Actualizado"
            description="Negocio actualizado con éxito"
          />
          <Business.View
            business={business}
            asAdmin={JWTUser?.role === "admin"}
          />
        </>
      );
    },
    {
      transform: ({ body }) => {
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
      <Business.Edit
        tags={tags}
        users={users}
        business={business}
        asAdmin={JWTUser?.role === "admin"}
      />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.Edit
            tags={tags}
            users={users}
            business={business}
            asAdmin={JWTUser?.role === "admin"}
          />
        </DashboardLayout>
      </Layout>
    );
  })
  .get("/new", async ({ JWTUser, headers }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();

    return headers["hx-request"] ? (
      <Business.New
        tags={tags}
        users={users}
        asAdmin={JWTUser?.role === "admin"}
        ownerId={JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined}
      />
    ) : (
      <Layout>
        <DashboardLayout role={JWTUser!.role} current="/d/business">
          <Business.New
            tags={tags}
            users={users}
            asAdmin={JWTUser?.role === "admin"}
            ownerId={
              JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined
            }
          />
        </DashboardLayout>
      </Layout>
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

      if (JWTUser!.role !== "admin") {
        const [business] = await getBusinessesAsOwner(parseInt(JWTUser!.id));
        return (
          <>
            <Notification
              title="Negocio creado"
              description="Se le notificará a los administradores para que lo habiliten pronto"
            />
            <Business.View business={business} />
          </>
        );
      }

      const businesses = await getBusinessesAsAdmin();
      return (
        <>
          <Notification
            title="Negocio creado"
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
        const c = Value.Convert(insertBusinessForm, body) as Static<
          typeof insertBusinessForm
        >;
        // Object assign replaces object content body = c does not
        Object.assign(body, c);
        body.tags = [body.tags].flat().map((e: any) => JSON.parse(e));
      },
      body: insertBusinessForm,
    },
  );

export default businessRouter;
