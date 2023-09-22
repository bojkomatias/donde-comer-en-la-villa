import { db } from "@/db";
import { business } from "@/db/schema/business";
import { tag, tagToBusiness } from "@/db/schema/tag";
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
    .select({ ...columns, tags: tag })
    .from(tagToBusiness)
    .where(eq(tagToBusiness.tagId, id))
    .leftJoin(business, eq(tagToBusiness.businessId, business.id))
    .leftJoin(tag, eq(tag.id, tagToBusiness.tagId));
}
