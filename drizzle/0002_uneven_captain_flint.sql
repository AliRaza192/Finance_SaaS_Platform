ALTER TABLE "accounts" ADD COLUMN "plaid_id" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "plaud_id";