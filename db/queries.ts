import { cache } from 'react';
import db from '@/db/drizzle';
import { challenges, challengesOptions, courses, 
    lessons, 
    units, 
    userProgress,
    challengesProgress,
} from './schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';


export const getUserProgress = cache(async () => {
    const {userId}  = await auth();
    if (!userId) {
        return null;
    }
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
});

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany({
        orderBy: (courses, { asc }) => [asc(courses.id)],
    });
    return data;
});

export const getUnits = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId) {
        return [];
    }
    //TODO : Confirm whether order is needed 
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengesProgress: {
                                where: eq(
                                    challengesProgress.userId, 
                                    userId),

                            },
                        },
                    },
                },
            },
        },
    });
    
    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if(lesson.challenges.length === 0) {
                return { ...lesson, completed: false };
            }
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengesProgress 
                    && challenge.challengesProgress.length > 0 
                    && challenge.challengesProgress.every((progress) => progress.completed);
            });
            
            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});


export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
       //TODO: Populate with lessons
    });
    return data;
})

export const getCourseProgress = cache(async() => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId) {
        return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengesProgress: {
                                where: eq(
                                    challengesProgress.userId, 
                                    userId),
                            },
                        },
                    },
                },
            },
        },
    });
    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
        //TODO: if somrthing does not work, check the last if clause
        return lesson.challenges.some((challenge) => {
            return !challenge.challengesProgress || challenge.challengesProgress.length === 0
            || challenge.challengesProgress.some((progress) => progress.completed == false);
        });
    })

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

export const getLesson = cache(async (id? : number) => {
    const { userId} = await auth();
    if(!userId) {
        return null;
    }
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;
    if(!lessonId) {
        return null;
    }
    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy : (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    options: true,
                    challengesProgress: {
                        where: eq(challengesProgress.userId, userId),
                    },
                },
            },
        },
    }); 
    if(!data || !data.challenges) {
        return null;
    }

    const normalizedData = data.challenges.map((challenge) => {

        const completed = challenge.challengesProgress && challenge.challengesProgress.length > 0
        && challenge.challengesProgress.every((progress) => progress.completed);

        return { ...challenge, completed };
    })

    return { ...data, challenges: normalizedData };

});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if(!courseProgress?.activeLessonId) {
        return 0;
    }
    const lesson = await getLesson(courseProgress.activeLessonId);
    if(!lesson) {
        return 0;
    }
    const completedChallenges = lesson.challenges
    .filter((challenge) => challenge.completed);
    const percentage = Math.round(completedChallenges.length / lesson.challenges.length * 100);
    return percentage;
});

