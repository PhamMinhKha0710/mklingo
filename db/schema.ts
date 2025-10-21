import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const Courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text('image').notNull(),
});