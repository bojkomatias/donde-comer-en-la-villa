import { BusinessNew } from "@/modules/business/business-new";
import setup from "@/config/setup";
import { getTags } from "@/services/tag";
import { getUsersForSelector } from "@/services/user";
import Elysia from "elysia";
import DashboardLayout from "../../layout";

export default new Elysia({ name: "business-new-page" })
  .use(setup)
  .get("/new", async ({ JWTUser, headers }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();

    return headers["hx-request"] ? (
      <BusinessNew
        tags={tags}
        users={users}
        asAdmin={JWTUser?.role === "admin"}
        ownerId={JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined}
      />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessNew
          tags={tags}
          users={users}
          asAdmin={JWTUser?.role === "admin"}
          ownerId={JWTUser?.role === "owner" ? parseInt(JWTUser.id) : undefined}
        />
      </DashboardLayout>
    );
  });
