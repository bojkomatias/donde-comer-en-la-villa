import DashboardLayout from "@/app/dashboard/layout";
import { BusinessEdit } from "@/modules/business/business-edit";
import setup from "@/config/setup";
import { getBusinessById } from "@/services/business";
import { getTags } from "@/services/tag";
import { getTagsByBusinessId } from "@/services/tag-to-business";
import { getUsersForSelector } from "@/services/user";

import Elysia from "elysia";

export default new Elysia({ name: "business-edit-page" })
  .use(setup)
  .get("/:id/edit", async ({ JWTUser, headers, params: { id } }) => {
    const tags = await getTags();
    const users = await getUsersForSelector();
    const business = await getBusinessById(parseInt(id));

    // Add tags from relation
    business.tags = (await getTagsByBusinessId(business.id)).map(
      (e) => e.tagId,
    );

    return headers["hx-request"] ? (
      <BusinessEdit
        tags={tags}
        users={users}
        business={business}
        asAdmin={JWTUser?.role === "admin"}
      />
    ) : (
      <DashboardLayout role={JWTUser!.role}>
        <BusinessEdit
          tags={tags}
          users={users}
          business={business}
          asAdmin={JWTUser?.role === "admin"}
        />
      </DashboardLayout>
    );
  });
