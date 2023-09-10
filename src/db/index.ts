import { Database } from "bun:sqlite";
import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";

export const sqlite = new Database("sqlite.db");
export const db: BunSQLiteDatabase = drizzle(sqlite);
