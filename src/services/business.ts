import { db } from "@/db";
import { business, insertBusinessForm } from "@/db/schema/business";
import { tagToBusiness } from "@/db/schema/tag";
import { user } from "@/db/schema/user";
import { and, eq, getTableColumns, like, or, sql } from "drizzle-orm";
import { Static } from "@sinclair/typebox";

// MARKETING
export async function getInitialBusinesses() {
  return await db
    .select()
    .from(business)
    .orderBy(business.featured)
    .where(eq(business.enabled, true));
}

export async function getBusinessesQuery(q: string) {
  return await db
    .select()
    .from(business)
    .where(
      and(
        or(
          like(business.name, `%${q}%`),
          like(business.instagram, `%${q}%`),
          like(business.tags, `%${q}%`),
        ),
        eq(business.enabled, true),
      ),
    );
}

// OWNER
export async function getBusinessesAsOwner(id: number) {
  const columns = getTableColumns(business);
  const result = await db
    .select({ ...columns, owner: user })
    .from(business)
    .where(eq(business.owner, id))
    .leftJoin(user, eq(business.owner, user.id));

  // In the future. they may handle many
  return result;
}

// ADMIN
export async function getBusinessesAsAdmin() {
  const columns = getTableColumns(business);

  return await db
    .select({ ...columns, owner: user })
    .from(business)
    .leftJoin(user, eq(business.owner, user.id));
}

export async function getBusinessByIdWithOwner(id: number) {
  const columns = getTableColumns(business);

  const result = await db
    .select({ ...columns, owner: user })
    .from(business)
    .where(eq(business.id, id))
    .leftJoin(user, eq(business.owner, user.id));

  return result[0];
}
export type BusinessWithOwner = Awaited<
  ReturnType<typeof getBusinessByIdWithOwner>
>;

export async function getBusinessById(id: number) {
  const result = await db.select().from(business).where(eq(business.id, id));

  return result[0];
}

export async function createBusiness(
  newBusiness: Static<typeof insertBusinessForm>,
) {
  let { tags, ...rest } = newBusiness;

  // Transaction to handle rollback if needed
  const result = await db.transaction(async (tx) => {
    const r = await tx
      .insert(business)
      .values({
        ...rest,
        tags: tags.map((e) => e.name),
      })
      .returning({ id: business.id });

    tags = [tags].flat();
    const t_b_values = tags?.map(({ id }) => ({
      businessId: r[0].id,
      tagId: id,
    }));

    const ra = (await tx.insert(tagToBusiness).values(t_b_values)).rowsAffected;

    // Rollback the whole process if tags don't match inserted tags
    if (ra !== tags.length) return tx.rollback();
    return ra;
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
      .set({
        ...rest,
        tags: tags.map((e) => e.name),
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(business.id, id))
      .returning({ id: business.id });

    if (tags) {
      //Delete all tags
      await tx
        .delete(tagToBusiness)
        .where(eq(tagToBusiness.businessId, r[0].id));
      // Then re-insert
      tags = [tags].flat();
      const t_b_values = tags?.map(({ id }) => ({
        businessId: r[0].id,
        tagId: id,
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
