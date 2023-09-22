import { db } from "@/db";
import { business, insertBusinessForm } from "@/db/schema/business";
import { tag, tagToBusiness } from "@/db/schema/tag";
import { user } from "@/db/schema/user";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Static } from "@sinclair/typebox";
import { review } from "@/db/schema/review";

export async function getBusinesses() {
  return await db.select().from(business);
}

export async function getBusinessesWithUser() {
  const columns = getTableColumns(business);

  return await db
    .select({ ...columns, owner: user.name })
    .from(business)
    .leftJoin(user, eq(business.owner, user.id));
}
export type BusinessesWithUser = Awaited<
  ReturnType<typeof getBusinessesWithUser>
>;

export async function getBusinessById(id: number) {
  const result = await db.select().from(business).where(eq(business.id, id));

  return result[0];
}
export async function getBusinessWithRelations(id: number) {
  const columns = getTableColumns(business);
  const rows = await db
    .select({
      ...columns,
      tag: tag.name,
      owner: user,
      review: review,
    })
    .from(business)
    .where(eq(business.id, id))
    .leftJoin(user, eq(business.owner, user.id))
    .leftJoin(tagToBusiness, eq(business.id, tagToBusiness.businessId))
    .leftJoin(tag, eq(tagToBusiness.tagId, tag.id))
    .leftJoin(review, eq(business.id, review.business));

  // Map into a single row (flatten)
  // This works because we are returning one object, returning many needs a better reduce.
  const tags = rows.map((e) => e.tag).filter(Boolean);
  const reviews = rows.map((e) => e.review).filter(Boolean);
  // Exclude them since they were just placeholders
  const { tag: tagD, review: reviewD, ...bus } = rows[0];

  const result = { ...bus, tags, reviews };

  return result;
}
export type BusinessWithRelation = Awaited<
  ReturnType<typeof getBusinessWithRelations>
>;

export async function createBusiness(
  newBusiness: Static<typeof insertBusinessForm>,
) {
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

export async function updateBusiness(
  id: number,
  newBusiness: Static<typeof insertBusinessForm>,
) {
  let { tags, ...rest } = newBusiness;

  // Transaction to handle rollback if needed
  const result = await db.transaction(async (tx) => {
    const r = await tx
      .update(business)
      .set({ ...rest, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(business.id, id))
      .returning({ id: business.id });

    if (tags) {
      //Delete all tags
      await tx
        .delete(tagToBusiness)
        .where(eq(tagToBusiness.businessId, r[0].id));
      // Then re-insert
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
