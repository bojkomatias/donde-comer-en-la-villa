import Elysia from "elysia";
import setup from "../(setup)";
import { getUsers } from "@/services/user";
import { UserRows, UsersTable } from "@/modules/users/users-table";
import { DashboardLayout } from "@/ui/dashboard/layout";
import { nextURL, querySearchParams } from "@/ui/data-table/utils";
import { userSchema } from "@/db/schema/user";

const users = new Elysia({
  name: "users",
  prefix: "/d/users",
})
  .use(setup)
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
  .get("/", async ({ headers, set, JWTUser }) => {
    /**
     * For different hx-targets responses might be different,
     * Ignore caching if this header/s vary
     */
    set.headers["Vary"] = "hx-target";

    const users = await getUsers({});

    return headers["hx-target"] ? (
      <UsersTable>
        <UserRows users={users} next="/d/users/q?page=1" />
      </UsersTable>
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <UsersTable>
          <UserRows users={users} next="/d/users/q?page=1" />
        </UsersTable>
      </DashboardLayout>
    );
  })
  .get(
    "/q",
    async ({ query }) => {
      const users = await getUsers(query);
      return <UserRows users={users} next={nextURL("/d/users/q", query)} />;
    },
    {
      query: querySearchParams(userSchema),
    },
  );

export default users;
