import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  blob,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { user } from "./user";
import { sql } from "drizzle-orm";
import { t } from "elysia";

export const business = sqliteTable(
  "business",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    phone: text("phone").notNull(),
    instagram: text("instagram").notNull(),
    address: text("address"),
    location: text("location"),
    image: blob("image").notNull(),
    // Tags are virtual, but we can still store them here as a helper
    tags: text("tags").$type<number[] | string[] | string>().notNull(),
    featured: integer("featured", { mode: "boolean" }).default(false),
    enabled: integer("enabled", { mode: "boolean" }).default(false),
    owner: integer("user_id")
      .references(() => user.id)
      .notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("business_name_unique").on(table.name),
    };
  },
);

export type SelectBusiness = typeof business.$inferSelect; // return type when queried
export type InsertBusiness = typeof business.$inferInsert; // insert type

/** Schema to validate API body
 * (tags exist on form) => then are passed to tag_to_business on db
 */
export const insertBusinessForm = createInsertSchema(business, {
  owner: t.Number(),
  // Override the inserted type (real model type, an array of ids referencing to tags through middle table)
  tags: t.Array(t.Object({ id: t.Number(), name: t.String() })),
  image: t.Any()
});

export const businessSchema = createSelectSchema(business, {
  owner: t.Number(),
  // Override the inserted type (real model type, an array of ids referencing to tags through middle table)
  tags: t.Array(t.Object({ id: t.Number(), name: t.String() })),
});
