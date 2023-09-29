import { db } from "@/db";
import { business } from "@/db/schema/business";
import { review } from "@/db/schema/review";
import { tagToBusiness } from "@/db/schema/tag";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

export async function getTagsByBusinessId(id: number) {
  return await db
    .select()
    .from(tagToBusiness)
    .where(eq(tagToBusiness.businessId, id));
}

export async function getBusinessesByTag(id: number) {
  const columns = getTableColumns(business);
  return await db
    .select({
      ...columns,
      reviews: sql<number | null>`avg(${review.qualification})`,
    })
    .from(tagToBusiness)
    .where(and(eq(tagToBusiness.tagId, id), eq(business.enabled, true)))
    .rightJoin(business, eq(tagToBusiness.businessId, business.id))
    .leftJoin(review, eq(review.business, business.id))
    .orderBy(business.featured)
    .groupBy(business.id);
}
