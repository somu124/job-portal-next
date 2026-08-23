CREATE TABLE `sessions` (
	`id` varchar(256) PRIMARY KEY,
	`user_id` int NOT NULL,
	`user_agent` text NOT NULL,
	`ip` varchar(256) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`valid` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `role` enum('admin','jobSeeker','employer') DEFAULT 'jobSeeker' NOT NULL;