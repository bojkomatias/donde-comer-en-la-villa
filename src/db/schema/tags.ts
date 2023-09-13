import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const tag = sqliteTable("tag", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const tagToBusiness = sqliteTable(
  "tag_to_business",
  {
    tagId: integer("tag_id"),
    businessId: integer("business_id"),
  },
  (table) => {
    return {
      pk: primaryKey(table.tagId, table.businessId),
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
      pk: primaryKey(table.tagId, table.productId),
    };
  },
);

export type Tag = typeof tag.$inferSelect; // return type when queried
export type InsertTag = typeof tag.$inferInsert; // insert type
