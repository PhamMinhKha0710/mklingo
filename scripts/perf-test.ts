







































































































































































































































import 'dotenv/config';
import db from '../db/drizzle';
import { eq, desc } from 'drizzle-orm';
import {
    courses,
    units,
    userProgress,
    challengesProgress,
    lessons
} from '../db/schema';

// This script simulates the heavy DB calls of the /learn page
// bypassing Clerk Auth to test pure DB performance.

const HARDCODED_USER_ID = "user_2test123"; // Dummy user ID for testing

async function simulateGetLearnPageData() {
    // We simulate the Promise.all logic from getLearnPageData()
    const [progress, unitsData] = await Promise.all([
        db.query.userProgress.findFirst({
            where: eq(userProgress.userId, HARDCODED_USER_ID),
            with: { activeCourse: true },
        }),
        db.query.units.findMany({
            orderBy: (u, { asc }) => [asc(u.order)],
            where: eq(units.courseId, 1), // Assuming activeCourseId = 1
            with: {
                lessons: {
                    orderBy: (l, { asc }) => [asc(l.order)],
                    with: {
                        unit: true,
                        challenges: {
                            orderBy: (c, { asc }) => [asc(c.order)],
                            with: {
                                challengesProgress: {
                                    where: eq(challengesProgress.userId, HARDCODED_USER_ID),
                                },
                            },
                        },
                    },
                },
            },
        })
    ]);

    return { progress, units: unitsData?.length || 0 };
}

async function runPerformanceTest(concurrentRequests: number) {
    console.log(`\n🚀 Starting Load Test: Simulating ${concurrentRequests} concurrent requests to DB...`);
    const startTime = performance.now();

    const promises = [];
    for (let i = 0; i < concurrentRequests; i++) {
        promises.push(simulateGetLearnPageData());
    }

    try {
        await Promise.all(promises);
        const endTime = performance.now();
        const timeTakenMs = endTime - startTime;

        console.log(`✅ Success! All ${concurrentRequests} requests resolved.`);
        console.log(`⏱️ Total Time Taken: ${timeTakenMs.toFixed(2)} ms`);
        console.log(`⚡ Average Time per Request: ${(timeTakenMs / concurrentRequests).toFixed(2)} ms\n`);
    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

async function main() {
    console.log("--- BẮT ĐẦU KIỂM TRA HIỆU NĂNG DATABASE (DB LOAD TEST) ---");

    // Warm up
    await simulateGetLearnPageData();

    await runPerformanceTest(10);  // 10 người dùng tải trang cùng lúc
    await runPerformanceTest(50);  // 50 người dùng tải trang cùng lúc
    await runPerformanceTest(100); // 100 người dùng tải trang cùng lúc

    console.log("--- HOÀN TẤT KIỂM TRA ---");
    process.exit(0);
}

main();
