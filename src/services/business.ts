import { db } from "@/db";
import { business, businessForm } from "@/db/schema/business";
import { tagToBusiness } from "@/db/schema/tag";
import { user } from "@/db/schema/user";
import { eq, getTableColumns } from "drizzle-orm";
import { Static } from "@sinclair/typebox";

export async function getBusinessesAsAdmin() {
  const { id, name, phone, featured, enabled } = getTableColumns(business);
  return await db
    .select({ id, name, phone, featured, enabled })
    .from(business)
    .leftJoin(user, eq(business.owner, user.id));
}

export async function createBusiness(newBusiness: Static<typeof businessForm>) {
  let { tags, ...rest } = newBusiness;

  // Transaction to handle rollback if needed
  const result = await db.transaction(async (tx) => {
    const r = await tx
      .insert(business)
      .values(rest)
      .returning({ id: business.id });

    if (tags) {
      tags = [tags].flat();
      const t_b_values = tags?.map((e) => ({
        businessId: r[0].id,
        tagId: e,
      }));

      const ra = (await tx.insert(tagToBusiness).values(t_b_values))
        .rowsAffected;

      // Rollback the whole process if tags don't match inserted tags
      if (ra !== tags.length) return tx.rollback();
      return ra;
    }
  });
  return result;
}
