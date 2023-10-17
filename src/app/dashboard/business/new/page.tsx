import { BusinessNew } from "@/modules/business/business-new";
import setup from "@/config/setup";
import { getTags } from "@/services/tag";
import { getUsersForSelector } from "@/services/user";
import Elysia from "elysia";
import DashboardLayout from "../../layout";

const BusinessNewPage = new Elysia({ name: "business-new-page" })
  .use(setup)
  .get("/new", async ({ token, headers }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();

    return headers["hx-request"] ? (
      <BusinessNew
        tags={tags}
        users={users}
        asAdmin={token?.role === "admin"}
        ownerId={token?.role === "owner" ? parseInt(token.id) : undefined}
      />
    ) : (
      <DashboardLayout token={token}>
        <BusinessNew
          tags={tags}
          users={users}
          asAdmin={token?.role === "admin"}
          ownerId={token?.role === "owner" ? parseInt(token.id) : undefined}
        />
      </DashboardLayout>
    );
  });

export default BusinessNewPage;
