import { serial, text, pgTable, pgSchema, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const prompt = pgTable("prompts", {
  id: uuid("id").primaryKey(),
  prompt: text("prompt").notNull(),
});

export const images = pgTable("prompt_images_URL", {
  id: serial("uuid").primaryKey(),
  imageURl: text("image_url").notNull(),
  ownerId: uuid("author_id"),
});

export const promptImgRel = relations(prompt, ({ many }) => ({
  images: many(images),
}));

export const imagePromptRel = relations(images, ({ one }) => ({
  owner: one(prompt, {
    fields: [images.ownerId],
    references: [prompt.id],
  }),
}));
