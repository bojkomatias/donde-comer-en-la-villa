import { db } from "@/db";
import { tagToBusiness } from "@/db/schema/tag";
import { eq } from "drizzle-orm";

export async function getTagsByBusinessId(id: number) {
  return await db
    .select()
    .from(tagToBusiness)
    .where(eq(tagToBusiness.businessId, id));
}
