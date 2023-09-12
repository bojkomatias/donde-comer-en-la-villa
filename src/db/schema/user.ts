import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  image: text("image"),
  role: text("role")
    .$type<"admin" | "owner" | "customer">()
    .notNull()
    .default("customer"),

  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type User = typeof user.$inferSelect; // return type when queried
export type InsertUser = typeof user.$inferInsert; // insert type
