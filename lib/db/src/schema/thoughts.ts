import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const thoughtsTable = pgTable("thoughts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull().default("general"),
  tags: text("tags").array().notNull().default([]),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertThoughtSchema = createInsertSchema(thoughtsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertThought = z.infer<typeof insertThoughtSchema>;
export type Thought = typeof thoughtsTable.$inferSelect;
