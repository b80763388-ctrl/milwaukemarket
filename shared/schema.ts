import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table - Milwaukee tools
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // Polish name
  nameEn: text("name_en"), // English name
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // "wiertarki", "szlifierki", "klucze", "mloty", "zestawy"
  description: text("description").notNull(), // Polish description
  descriptionEn: text("description_en"), // English description
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  exhibitionPrice: decimal("exhibition_price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  images: text("images").array(),
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

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  courier: text("courier").notNull(), // "inpost" | "dpd" | "dhl"
  orderItems: json("order_items").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email(),
  phone: z.string().min(9),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/),
  courier: z.enum(["inpost", "dpd", "dhl"]),
});

// Types
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Chat sessions table
export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  status: text("status").notNull().default("active"), // "active" | "closed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  closedAt: timestamp("closed_at"),
});

// Chat messages table
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  sender: text("sender").notNull(), // "customer" | "admin"
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  lastMessageAt: true,
  closedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Extended chat session with messages
export type ChatSessionWithMessages = ChatSession & {
  messages: ChatMessage[];
};
