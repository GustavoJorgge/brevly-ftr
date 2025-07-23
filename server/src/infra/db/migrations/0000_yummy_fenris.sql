CREATE TABLE "links" (
	"url_id" text PRIMARY KEY NOT NULL,
	"url_original" text NOT NULL,
	"short_url" text NOT NULL,
	"remote_key" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url"),
	CONSTRAINT "links_remote_key_unique" UNIQUE("remote_key")
);
