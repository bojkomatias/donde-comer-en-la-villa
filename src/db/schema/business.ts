import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sqlite } from "..";

export const businesses = sqliteTable("businesses", {
  id: integer("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  phone: text("phone"),
  instagram: text("instagram"),
});

sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS businesses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, phone TEXT, instagram TEXT)"
  )
  .run();

export type Business = typeof businesses.$inferSelect; // return type when queried
export type InsertBusiness = typeof businesses.$inferInsert; // insert type
