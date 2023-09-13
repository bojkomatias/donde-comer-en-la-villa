import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { business } from "./business";
import { sql } from "drizzle-orm";

export const product = sqliteTable("product", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price"),
  // Add options etc later
  images: text("images", { mode: "json" }).$type<string[]>(),
  featured: integer("featured", { mode: "boolean" }).default(false),
  business: integer("business_id")
    .references(() => business.id)
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type Product = typeof product.$inferSelect; // return type when queried
export type InsertProduct = typeof product.$inferInsert; // insert type
