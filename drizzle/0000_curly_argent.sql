CREATE TABLE `business` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`phone` text,
	`location` text,
	`socials` text,
	`webpage` text,
	`image` text,
	`tags` text,
	`featured` integer DEFAULT false,
	`user_id` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`base_price` real,
	`images` text,
	`featured` integer DEFAULT false,
	`business_id` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `review` (
	`id` integer PRIMARY KEY NOT NULL,
	`qualification` integer NOT NULL,
	`comment` text,
	`business_id` integer NOT NULL,
	FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tag_to_business` (
	`tag_id` integer,
	`business_id` integer,
	PRIMARY KEY(`business_id`, `tag_id`)
);
--> statement-breakpoint
CREATE TABLE `tag_to_product` (
	`tag_id` integer,
	`product_id` integer,
	PRIMARY KEY(`product_id`, `tag_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`image` text,
	`role` text DEFAULT 'customer' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `business_name_unique` ON `business` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tag_name_unique` ON `tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);