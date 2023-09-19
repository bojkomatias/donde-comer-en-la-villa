import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
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
    description: text("description"),
    phone: text("phone"),
    instagram: text("instagram"),
    twitter: text("twitter"),
    location: text("location"),
    webpage: text("webpage"),
    image: text("image"),
    featured: integer("featured", { mode: "boolean" }).default(false),
    userId: integer("user_id").references(() => user.id),
    createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("business_name_unique").on(table.name),
    };
  },
);

export type Business = typeof business.$inferSelect; // return type when queried
export type InsertBusiness = typeof business.$inferInsert; // insert type

export const businessForm = t.Intersect([
  createInsertSchema(business, {
    userId: t.Number({ error: "Propietario debe referenciar ID numérico" }),
  }),
  t.Object({ tags: t.Array(t.Number()) }),
]);
