import { db } from "@/db";
import { business } from "@/db/schema/business";
import { tagToBusiness } from "@/db/schema/tag";
import { eq, getTableColumns } from "drizzle-orm";

export async function getTagsByBusinessId(id: number) {
  return await db
    .select()
    .from(tagToBusiness)
    .where(eq(tagToBusiness.businessId, id));
}

export async function getBusinessesByTag(id: number) {
  const columns = getTableColumns(business);
  return await db
    .select(columns)
    .from(tagToBusiness)
    .where(eq(tagToBusiness.tagId, id))
    .rightJoin(business, eq(tagToBusiness.businessId, business.id))
    .orderBy(business.featured);
}
