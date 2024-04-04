import { serial, text, pgTable, pgSchema, uuid } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const prompt = pgTable("prompts", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  prompt: text("prompt").notNull(),
  imageURl: text("original_image_url").notNull(),
});

export const generatedImages = pgTable("generated_images_url", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  imageURl: text("generated_image_url").notNull(),
  promptId: uuid("prompt_id").references(() => prompt.id),
});

export const promptGeneratedImageRel = relations(prompt, ({ many }) => ({
  generatedImages: many(generatedImages),
}));

export const generatedImagesToPrompt = relations(
  generatedImages,
  ({ one }) => ({
    originalImage: one(prompt),
  }),
);
