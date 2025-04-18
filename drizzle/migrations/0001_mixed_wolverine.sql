ALTER TABLE "images" DROP CONSTRAINT "images_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;