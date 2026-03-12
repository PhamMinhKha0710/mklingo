import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import db from '@/db/drizzle';
import { challenges, challengesOptions, courses, 
    lessons, 
    units, 
    userProgress,
    challengesProgress,
    userSubscription,
} from './schema';
import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';


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

/** Cache 5 phút - danh sách courses ít thay đổi */
const getCachedCourses = unstable_cache(
    () =>
        db.query.courses.findMany({
            orderBy: (c, { asc }) => [asc(c.id)],
        }),
    ['courses-list'],
    { revalidate: 300, tags: ['courses'] }
);

export const getCourses = cache(() => getCachedCourses());

export const getUnits = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId) {
        return [];
    }
    //TODO : Confirm whether order is needed 
    const data = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
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
       with: {
        units: {
            orderBy:(units, { asc }) => [asc(units.order)],
            with: {
                lessons: {
                    orderBy: (lessons, { asc }) => [asc(lessons.order)],
                }
            },
        },
       },
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
    });

    // Tính lessonPercentage từ data đã có - tránh gọi getLesson() thêm 1 lần
    let activeLessonPercentage = 0;
    if (firstUncompletedLesson?.challenges?.length) {
        const completedCount = firstUncompletedLesson.challenges.filter((challenge) =>
            challenge.challengesProgress &&
            challenge.challengesProgress.length > 0 &&
            challenge.challengesProgress.every((p) => p.completed)
        ).length;
        activeLessonPercentage = Math.round(
            (completedCount / firstUncompletedLesson.challenges.length) * 100
        );
    }

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
        activeLessonPercentage,
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
    return courseProgress?.activeLessonPercentage ?? 0;
});

const DAY_IN_MS = 86_400_000;

export const getUserSubscription = cache(async () => {
    const {userId} = await auth();
    if(!userId) {
        return null;
    }
    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId),
    });
    if (!data) return null;

    const isActive =
        !!data.stripePriceId &&
        (data.stripeCurrentPeriodEnd?.getTime() ?? 0) + DAY_IN_MS > Date.now();

    return {
        ...data,
        isActive,
    };
});


/** Cache 60s - leaderboard ít thay đổi, giảm load DB. Tag để revalidate khi points thay đổi */
const getCachedLeaderboard = unstable_cache(
    () =>
        db.query.userProgress.findMany({
            orderBy: [desc(userProgress.points)],
            limit: 10,
            columns: {
                userId: true,
                userName: true,
                userImageSrc: true,
                points: true,
            },
        }),
    ['leaderboard-top10'],
    { revalidate: 60, tags: ['leaderboard'] }
);

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;
    return getCachedLeaderboard();
});

/** Gộp getUnits + getCourseProgress thành 1 query - giảm thời gian load Learn page ~50% */
export const getLearnPageData = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;

    // Lấy progress trước — tránh gọi getUserProgress() 2 lần
    const progress = await getUserProgress();
    if (!progress?.activeCourseId) return null;

    // Chạy song song subscription + units query (dùng activeCourseId đã có)
    const [subscription, unitsData] = await Promise.all([
        getUserSubscription(),
        db.query.units.findMany({
            orderBy: (u, { asc }) => [asc(u.order)],
            where: eq(units.courseId, progress.activeCourseId),
            with: {
                lessons: {
                    orderBy: (l, { asc }) => [asc(l.order)],
                    with: {
                        unit: true,
                        challenges: {
                            orderBy: (c, { asc }) => [asc(c.order)],
                            with: {
                                challengesProgress: {
                                    where: eq(challengesProgress.userId, userId),
                                },
                            },
                        },
                    },
                },
            },
        }),
    ]);

    if (!progress.activeCourse || !unitsData) return null;

    const unitsWithCompleted = unitsData.map((unit) => ({
        ...unit,
        lessons: unit.lessons.map((lesson) => {
            const completed = lesson.challenges.length > 0 && lesson.challenges.every(
                (c) => c.challengesProgress?.length && c.challengesProgress.every((p) => p.completed)
            );
            return { ...lesson, completed };
        }),
    }));

    const firstUncompleted = unitsWithCompleted
        .flatMap((u) => u.lessons)
        .find((l) => l.challenges.some(
            (c) => !c.challengesProgress?.length || c.challengesProgress.some((p) => !p.completed)
        ));

    let activeLessonPercentage = 0;
    if (firstUncompleted?.challenges?.length) {
        const done = firstUncompleted.challenges.filter(
            (c) => c.challengesProgress?.length && c.challengesProgress.every((p) => p.completed)
        ).length;
        activeLessonPercentage = Math.round((done / firstUncompleted.challenges.length) * 100);
    }

    return {
        userProgress: progress,
        userSubscription: subscription,
        units: unitsWithCompleted,
        courseProgress: {
            activeLesson: firstUncompleted,
            activeLessonId: firstUncompleted?.id,
            activeLessonPercentage,
        },
    };
});