import Elysia from "elysia";
import { getUsers } from "@/services/user";
import { UserRows } from "@/modules/users/users-table";
import { nextURL, querySearchParams } from "@/ui/data-table/utils";
import { userSchema } from "@/db/schema/user";
import setup from "@/config/setup";

export default new Elysia({
  name: "users-route",
})
  .use(setup)
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
