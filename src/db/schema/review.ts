import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { business } from "./business";

export const review = sqliteTable("review", {
  id: integer("id").primaryKey(),
  qualification: integer("qualification").$type<1 | 2 | 3 | 4 | 5>().notNull(),
  comment: text("comment"),
  business: integer("business_id")
    .notNull()
    .references(() => business.id),
});

export type Review = typeof review.$inferSelect; // return type when queried
export type InsertReview = typeof review.$inferInsert; // insert type
