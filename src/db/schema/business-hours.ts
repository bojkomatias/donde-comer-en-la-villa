import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-typebox";
import { sql } from "drizzle-orm";
import { business } from "./business";

export const businessHours = sqliteTable("business_hours", {
  id: integer("id").primaryKey().notNull(),
  business: integer("business_id")
    .references(() => business.id)
    .notNull(),
  day: integer("day").notNull().$type<0 | 1 | 2 | 3 | 4 | 5 | 6>(),
  open: text("opens").notNull(),
  close: text("closes").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type SelectBusinessHours = typeof businessHours.$inferSelect; // return type when queried
export type InsertBusinessHours = typeof businessHours.$inferInsert; // insert type

/** Schema to validate API body
 * (tags exist on form) => then are passed to tag_to_business on db
 */
export const insertBusinessHours = createInsertSchema(businessHours);
