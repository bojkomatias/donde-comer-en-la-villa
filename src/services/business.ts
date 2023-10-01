import { db } from "@/db";
import {
  SelectBusiness,
  business,
  insertBusinessForm,
} from "@/db/schema/business";
import { tagToBusiness } from "@/db/schema/tag";
import { user } from "@/db/schema/user";
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  like,
  or,
  sql,
} from "drizzle-orm";
import { Static } from "@sinclair/typebox";
import { review } from "@/db/schema/review";
import { QuerySearchParams, pageLimit } from "@/ui/data-table/utils";
import { SelectBusinessHours, businessHours } from "@/db/schema/business-hours";

// MARKETING
export async function getInitialBusinesses() {
  const columns = getTableColumns(business);
  return await db
    .select({
      ...columns,
      reviews: sql<number | null>`avg(${review.qualification})`,
    })
    .from(business)
    .where(eq(business.enabled, true))
    .leftJoin(review, eq(review.business, business.id))
    .orderBy(business.featured)
    .groupBy(business.id);
}

export async function getBusinessesQuery(q: string) {
  const columns = getTableColumns(business);

  return await db
    .select({ ...columns, reviews: sql<number>`avg(${review.qualification})` })
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
    )
    .leftJoin(review, eq(review.business, business.id))
    .groupBy(business.id);
}

// DASHBOARD
export async function getBusinesses(q: QuerySearchParams<SelectBusiness>) {
  const columns = getTableColumns(business);

  return await db
    .select({ ...columns, ownerName: user.name })
    .from(business)
    .leftJoin(user, eq(business.owner, user.id))
    .where(
      q.search
        ? or(
            like(business.name, `%${q.search}%`),
            like(business.instagram, `%${q.search}%`),
            like(business.address, `%${q.search}%`),
            like(user.name, `%${q.search}%`),
          )
        : undefined,
    )
    .orderBy(
      q.orderBy
        ? q.sort === "asc"
          ? asc(business[q.orderBy])
          : desc(business[q.orderBy])
        : desc(business.createdAt),
    )
    .limit(pageLimit)
    .offset(q.page ? q.page * pageLimit : 0);
}

export async function getBusinessWithRelations(id: number) {
  const columns = getTableColumns(business);

  const result = await db
    .select({ ...columns, owner: user, bhs: businessHours })
    .from(business)
    .where(eq(business.id, id))
    .leftJoin(user, eq(business.owner, user.id))
    .leftJoin(businessHours, eq(business.id, businessHours.business));

  const BHs: SelectBusinessHours[] = [];
  result.forEach((e) => {
    if (e.bhs) BHs.push(e.bhs);
  });

  // @ts-ignore
  delete result[0].bhs;

  return { ...result[0], businessHours: BHs };
}
export type BusinessWithRelations = Awaited<
  ReturnType<typeof getBusinessWithRelations>
>;
// export type BusinessWithRelations = Omit<SelectBusiness, "owner"> & {
//   owner: SelectUser | null;
//   businessHours: SelectBusinessHours[] | null;
// };

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
