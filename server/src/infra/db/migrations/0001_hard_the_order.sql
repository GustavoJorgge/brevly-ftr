ALTER TABLE "links" DROP CONSTRAINT "links_remote_key_unique";--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "qtd_acesso" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "links" DROP COLUMN "remote_key";