import { db } from "@/db";
import { InsertBusinessHours, businessHours } from "@/db/schema/business-hours";
import { eq } from "drizzle-orm";

export async function getBusinessHoursByBusiness(id: number) {
  return await db
    .select()
    .from(businessHours)
    .where(eq(businessHours.business, id));
}

export async function upsertBusinessHours(bhs: InsertBusinessHours[]) {
  return await db.transaction(async (tx) => {
    await tx
      .delete(businessHours)
      .where(eq(businessHours.business, bhs[0].business));
    return await tx
      .insert(businessHours)
      .values(bhs)
      .returning({ id: businessHours.business });
  });
}
