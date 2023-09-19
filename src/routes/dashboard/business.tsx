import setup from "@/(setup)";
import Business from "@/components/business";
import DashboardLayout from "@/components/dashboard-layout";
import { Layout, withLayout } from "@/components/layout";
import { insertBusinessSchema } from "@/db/schema/business";
import { withLayoutV2 } from "@/utils/with-layout";
import Elysia from "elysia";

const business = new Elysia({
  name: "business",
  prefix: "/business",
})
  .use(setup)
  .get("/", ({ user, headers }) => {
    return withLayout(
      headers["hx-request"] === "true",
      <DashboardLayout role={user!.role} current="/d/business">
        <Business />
      </DashboardLayout>,
    );
  })

  .get("/new", ({ headers }) => {
    return withLayoutV2({
      hx: headers["hx-request"] === "true",
      Layout: Layout,
      props: { isAuth: true },
      Component: <Business.Form />,
    });
  })

  .post("/", ({ body }) => console.log(body), { body: insertBusinessSchema });

export default business;
