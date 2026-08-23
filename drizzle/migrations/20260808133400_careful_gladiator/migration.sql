CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(256) NOT NULL,
	`username` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` text NOT NULL,
	`phone_number` varchar(256),
	`deleted_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `username_unique` UNIQUE INDEX(`username`),
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
