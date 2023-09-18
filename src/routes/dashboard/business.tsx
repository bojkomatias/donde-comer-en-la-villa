import setup from "@/(setup)";
import Business from "@/components/business";
import DashboardLayout from "@/components/dashboard-layout";
import { withLayout } from "@/components/layout";
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
  .get("/new", () => <Business.Form />)
  .post("/", ({ body }) => console.log(body));

export default business;
