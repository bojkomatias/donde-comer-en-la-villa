import { db } from "@/db";
import { InsertBusinessHours, businessHours } from "@/db/schema/business-hours";
import { and, between, eq, gt, gte, lte, sql } from "drizzle-orm";

// MARKETING
export async function getBusinessesOpenToday() {
  const today = new Date().getDay();
  const r = await db
    .select()
    .from(businessHours)
    .where(eq(businessHours.day, today));

  return r;
}

export async function getBusinessesOpenNow() {
  const today = new Date().getDay();
  const now = `${new Date().getHours()}:${new Date().getMinutes()}:00`;

  const r = await db
    .select()
    .from(businessHours)
    .where(
      and(
        eq(businessHours.day, today),
        lte(businessHours.opens, now),
        gt(businessHours.closes, now),
      ),
    );

  return r;
}

// DASHBOARD
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
