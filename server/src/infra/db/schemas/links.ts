import { uuidv7 } from "uuidv7";
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  urlId: text("url_id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text("url_original").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  qtdAcesso: integer("qtd_acesso").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
