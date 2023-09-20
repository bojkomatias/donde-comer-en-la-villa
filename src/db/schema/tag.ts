import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const tag = sqliteTable(
  "tag",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("tag_name_unique").on(table.name),
    };
  },
);

export const tagToBusiness = sqliteTable(
  "tag_to_business",
  {
    tagId: integer("tag_id"),
    businessId: integer("business_id"),
  },
  (table) => {
    return {
      pk0: primaryKey(table.businessId, table.tagId),
    };
  },
);

export const tagToProduct = sqliteTable(
  "tag_to_product",
  {
    tagId: integer("tag_id"),
    productId: integer("product_id"),
  },
  (table) => {
    return {
      pk0: primaryKey(table.productId, table.tagId),
    };
  },
);

export type SelectTag = typeof tag.$inferSelect; // return type when queried
export type InsertTag = typeof tag.$inferInsert; // insert type
