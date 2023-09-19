import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
  "user",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password"),
    image: text("image"),
    role: text("role").$type<Role>().default("customer").notNull(),
    createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex("user_email_unique").on(table.email),
    };
  },
);

export type Role = "admin" | "owner" | "customer";

export type User = typeof user.$inferSelect; // return type when queried
export type InsertUser = typeof user.$inferInsert; // insert type
