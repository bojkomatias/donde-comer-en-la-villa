import Elysia, { t } from "elysia";
import setup from "../(setup)";
import { getUsers } from "@/services/user";
import { UserRows, UsersTable } from "@/modules/users/users-table";
import { DashboardLayout } from "@/ui/dashboard/layout";

const users = new Elysia({
  name: "users",
  prefix: "/d/users",
})
  .use(setup)
  .get(
    "/",
    async ({ headers, set, JWTUser, query: { search,page } }) => {
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
    },
    
  )
  .get('/q', async ({query:{search,page}})=>{
    if (search) {
      // If search and page, paginated search
      if (page) {
        const users = await getUsers({ search, page });
        return (
          <UserRows
            users={users}
            next={`/d/users/q?page=${page + 1}&search=${search}`}
          />
        );
      }
      //If search new, no page, give first page
      const users = await getUsers({ search });
      return (
        <UserRows
          users={users}
          next={`/d/users/q?page=1&search=${search}`}
        />
      );
    }
    const users = await getUsers({})
    return <UserRows users={users} next="/d/users/q?page=1" />

  },
  {
    query: t.Object({
      search: t.Optional(t.String()),
      page: t.Optional(t.Numeric()),
    }),
  },)
 

export default users;
