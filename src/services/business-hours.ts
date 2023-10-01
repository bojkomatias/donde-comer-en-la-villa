import { db } from "@/db";
import { InsertBusinessHours, businessHours } from "@/db/schema/business-hours";
import { eq, sql } from "drizzle-orm";

export async function getBusinessHoursByBusiness(id: number) {
  return await db
    .select()
    .from(businessHours)
    .where(eq(businessHours.business, id));
}

export async function upsertBusinessHours(bhs: InsertBusinessHours[]) {
  const r = await db
    .insert(businessHours)
    .values(bhs)
    .onConflictDoUpdate({
      target: [businessHours.business, businessHours.day],
      set: {
        business: sql`excluded.business_id`,
        day: sql`excluded.day`,
        opens: sql`excluded.opens`,
        closes: sql`excluded.closes`,
        updatedAt: sql`(CURRENT_TIMESTAMP)`,
      },
    })
    .returning({ id: businessHours.day });

  return r;
}
