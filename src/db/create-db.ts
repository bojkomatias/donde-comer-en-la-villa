import Database from "bun:sqlite";

const sqlite = new Database("sqlite.db");

/** Might need to run CREATE TABLE IF NOT EXISTS when 'sqlite.db' file doesn't exist */
// user

sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT, image TEXT, role TEXT DEFAULT `customer`, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
  )
  .run();

//business
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS business (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, phone TEXT, location TEXT, socials TEXT, webpage TEXT, image TEXT, featured INTEGER DEFAULT 0, user_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES user(id))",
  )
  .run();

// review
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS review (id INTEGER PRIMARY KEY AUTOINCREMENT, qualification INTEGER NOT NULL, comment TEXT, business_id INTEGER)",
  )
  .run();

// product
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, base_price REAL, images TEXT, featured INTEGER DEFAULT 0, business_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
  )
  .run();

// tags
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS tag (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)",
  )
  .run();

// tag to business
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS tag_to_business (tag_id INTEGER, business_id INTEGER, PRIMARY KEY (tag_id, business_id))",
  )
  .run();
// tag to product
sqlite
  .query(
    "CREATE TABLE IF NOT EXISTS tag_to_product (tag_id INTEGER, product_id INTEGER, PRIMARY KEY (tag_id, product_id))",
  )
  .run();
