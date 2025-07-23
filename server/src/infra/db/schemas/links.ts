import { randomUUID } from "crypto";
import { uuidv7 } from "uuidv7";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  urlId: text("url_id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text("url_original").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  remoteKey: text("remote_key").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
