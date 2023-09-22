import { db } from "@/db";
import { InsertTag, tag } from "@/db/schema/tag";
import { eq } from "drizzle-orm";

export async function getTags() {
  return await db.select().from(tag);
}

export async function getTagById(id: number) {
  const result = await db.select().from(tag).where(eq(tag.id, id));
  return result[0];
}

export async function updateTag(id: number, data: InsertTag) {
  try {
    const result = await db
      .update(tag)
      .set(data)
      .where(eq(tag.id, Number(id)))
      .returning();
    return result[0];
  } catch (error) {
    return null;
  }
}

export async function createTag(data: InsertTag) {
  try {
    const result = await db.insert(tag).values(data).returning();
    return result[0];
  } catch (error) {
    return null;
  }
}
