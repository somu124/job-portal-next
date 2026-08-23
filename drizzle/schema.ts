import { int, mysqlTable, text, varchar, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }).notNull(),
    userName: varchar('username', { length: 256 }).notNull().unique(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: text('password').notNull(),
    phoneNumber: varchar('phone_number', { length: 256 }),
    role: mysqlEnum('role', ['admin','jobSeeker', 'employer']).default('jobSeeker').notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'date' }).defaultNow().notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
})

export const sessions = mysqlTable('sessions', {
    id: varchar('id', { length: 256 }).primaryKey(),
    userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),  
    userAgent: text('user_agent').notNull(),
    ip: varchar('ip', { length: 256 }).notNull(),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
    valid: int('valid').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
})