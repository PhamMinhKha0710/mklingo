import { cache } from 'react';

import db from '@/db/drizzle';
import { Courses } from './schema';

export const getCourses = cache(async () => {
    const data = await db.query.Courses.findMany({
        orderBy: (courses, { asc }) => [asc(courses.id)],
    });
    return data;
});
