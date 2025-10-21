import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const Courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text('image').notNull(),

});

export const coursesRelations = relations(Courses, ({ many }) => ({
    userProgress: many(userProgress),
}));

export const userProgress = pgTable('user_progress', {
    UserId: text('user_id').primaryKey(),
    UserName: text("user_name").notNull().default("User"),
    UserImageSrc: text("user_image_src").notNull().default("/images/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => Courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(Courses, {
        fields: [userProgress.activeCourseId],
        references: [Courses.id],
    }),
}));