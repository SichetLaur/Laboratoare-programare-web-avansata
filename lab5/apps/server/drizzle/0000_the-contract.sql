CREATE TABLE `buildings` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`label` text NOT NULL,
	`comment` text
);
--> statement-breakpoint
CREATE TABLE `entrances` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`building_id` text NOT NULL,
	`entrance_name` text NOT NULL,
	`street` text NOT NULL,
	`number` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`coords_confirmed` integer DEFAULT false NOT NULL,
	`corrected_lat` real,
	`corrected_lng` real,
	`stories` integer,
	`flats` integer,
	`elevators` integer,
	`year_built` integer,
	`ground_floor_shops` integer,
	`survey_status` text DEFAULT 'not_started' NOT NULL,
	`surveyor_id` text,
	`surveyed_at` text,
	`address` text,
	`notes` text,
	`door_code` text,
	`access_type` text,
	`condition` text,
	FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `surveys` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`entrance_id` text NOT NULL,
	`surveyor_notes` text NOT NULL,
	`scheduled_at` text NOT NULL,
	FOREIGN KEY (`entrance_id`) REFERENCES `entrances`(`id`) ON UPDATE no action ON DELETE no action
);
