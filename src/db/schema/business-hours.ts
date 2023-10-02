import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-typebox";
import { sql } from "drizzle-orm";
import { business } from "./business";
import { t } from "elysia";

export const businessHours = sqliteTable(
  "business_hours",
  {
    business: integer("business_id")
      .references(() => business.id)
      .notNull(),
    day: integer("day").notNull(),
    opens: text("opens").notNull(),
    closes: text("closes").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      businessDayUnique: primaryKey(table.business, table.day),
    };
  },
);

export type SelectBusinessHours = typeof businessHours.$inferSelect; // return type when queried
export type InsertBusinessHours = typeof businessHours.$inferInsert; // insert type

/** Schema to validate API body
 * (tags exist on form) => then are passed to tag_to_business on db
 */
export const insertBusinessHours = createInsertSchema(businessHours);
