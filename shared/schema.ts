import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table - Milwaukee tools
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // "wiertarki", "szlifierki", "klucze", "mloty", "zestawy"
  description: text("description").notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  exhibitionPrice: decimal("exhibition_price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  sku: text("sku").notNull().unique(),
  voltage: text("voltage"), // "18V", "12V" etc
  batteryIncluded: boolean("battery_included").default(false),
  inStock: boolean("in_stock").default(true),
  condition: text("condition").notNull().default("Bardzo dobry - produkt powystawowy"),
  warranty: text("warranty").notNull().default("12 miesięcy gwarancji Milwaukee"),
  features: text("features").array().notNull(),
});

// Cart items - stored in memory
export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

// Insert schemas
export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

// Types
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Extended cart item with product details
export type CartItemWithProduct = CartItem & {
  product: Product;
};
