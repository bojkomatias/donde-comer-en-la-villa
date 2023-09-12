import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./user";
import { sql } from "drizzle-orm";

export const business = sqliteTable("business", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  phone: text("phone"),
  location: text("location"),
  socials: text("socials", { mode: "json" }).$type<string[]>(),
  webpage: text("webpage"),
  image: text("image"),
  tagToBusiness: text("tags", { mode: "json" }).$type<string[]>(),
  featured: integer("featured", { mode: "boolean" }).default(false),
  owner: integer("user_id").references(() => user.id),

  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type Business = typeof business.$inferSelect; // return type when queried
export type InsertBusiness = typeof business.$inferInsert; // insert type
