import Elysia from "elysia";
import setup from "../(setup)";
import { getUsers } from "@/services/user";
import { UsersTable } from "@/modules/users/users-table";
import { DashboardLayout } from "@/ui/dashboard/layout";

const users = new Elysia({
  name: "users",
  prefix: "/d/users",
})
  .use(setup)
  .get("/", async ({ headers, set, JWTUser }) => {
    const users = await getUsers();
    /**
     * For different hx-targets responses might be different,
     * Ignore caching if this header/s vary
     */
    set.headers["Vary"] = "hx-target";
    return headers["hx-target"] ? (
      <UsersTable users={users} />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <UsersTable users={users} />
      </DashboardLayout>
    );
  });

export default users;
