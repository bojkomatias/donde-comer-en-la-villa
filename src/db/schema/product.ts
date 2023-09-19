import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { business } from "./business";
import { sql } from "drizzle-orm";

export const product = sqliteTable("product", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price"),
  images: text("images"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  businessId: integer("business_id")
    .notNull()
    .references(() => business.id),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Product = typeof product.$inferSelect; // return type when queried
export type InsertProduct = typeof product.$inferInsert; // insert type
