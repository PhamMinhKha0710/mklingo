import { cache } from 'react';

import db from '@/db/drizzle';
import { Courses, userProgress } from './schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const getUserProgress = cache(async () => {
    const {userId}  = await auth();
    if (!userId) {
        return null;
    }
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.UserId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
});

export const getCourses = cache(async () => {
    const data = await db.query.Courses.findMany({
        orderBy: (courses, { asc }) => [asc(courses.id)],
    });
    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.Courses.findFirst({
        where: eq(Courses.id, courseId),
       //TODO: Populate with lessons
    });
    return data;
});
