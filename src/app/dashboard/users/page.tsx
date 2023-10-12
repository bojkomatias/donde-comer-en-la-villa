import Elysia from "elysia";
import { getUsers } from "@/services/user";
import { UserRows, UsersTable } from "@/modules/users/users-table";
import DashboardLayout from "@/app/dashboard/layout";
import UsersRoute from "./route";
import { nextURL } from "@/ui/data-table/utils";

const UsersPage = new Elysia({
  name: "users-page",
  prefix: "/users",
})
  .onBeforeHandle(({ request, set }) => {
    if (request.method === "GET") {
      // Change to false, indicating data is refreshed
      set.headers["users"] = "false";
      // Set that the request varies if the headers has changed (on post / put)
      set.headers["Vary"] = "users, hx-request";
      // Add cache control
      set.headers["Cache-Control"] = "public, max-age=300, must-revalidate";
    }
    if (request.method === "PUT" || request.method === "POST") {
      // Change to true, indicating resource is modified
      set.headers["users"] = "true";
    }
  })
  .use(UsersRoute)
  .get("/", async ({ headers, set, JWTUser }) => {
    /**
     * For different hx-targets responses might be different,
     * Ignore caching if this header/s vary
     */
    set.headers["Vary"] = "hx-target";

    const users = await getUsers({});

    return headers["hx-target"] ? (
      <UsersTable>
        <UserRows users={users} next={nextURL("/d/users/q", {})} />
      </UsersTable>
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <UsersTable>
          <UserRows users={users} next={nextURL("/d/users/q", {})} />
        </UsersTable>
      </DashboardLayout>
    );
  });

export default UsersPage;
