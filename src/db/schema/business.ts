import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-typebox";
import { user } from "./user";
import { sql } from "drizzle-orm";
import { t } from "elysia";

export const business = sqliteTable(
  "business",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    phone: text("phone"),
    instagram: text("instagram"),
    twitter: text("twitter"),
    address: text("address"),
    location: text("location"),
    webpage: text("webpage"),
    image: text("image"),
    tags: text("tags"),
    featured: integer("featured", { mode: "boolean" }).default(false),
    enabled: integer("enabled", { mode: "boolean" }).default(false),
    owner: integer("user_id").references(() => user.id),
    createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("business_name_unique").on(table.name),
    };
  },
);

export type Business = typeof business.$inferSelect; // return type when queried
export type InsertBusiness = typeof business.$inferInsert; // insert type

/** Schema to validate API body
 * (tags exist on form) => then are passed to tag_to_business on db
 */
export const businessForm = createInsertSchema(business, {
  owner: t.Number(),
  tags: t.Union([t.Number(), t.Array(t.Number())]),
});
