"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challenges, challengesProgress, lessons, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const {userId} = await auth();
    if(!userId) {
        throw new Error("Unauthorized");
    }
    const currentChallengeProgress = await getUserProgress();
    if(!currentChallengeProgress) {
        throw new Error("User progress not found");
    }
    
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });
    
    if(!challenge) {
        throw new Error("Challenge not found");
    }
    
    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengesProgress.findFirst({
        where: and(
            eq(challengesProgress.userId, userId), 
            eq(challengesProgress.challengeId, challengeId)),
    });
    const isPractice = !!existingChallengeProgress;

    if(currentChallengeProgress.hearts === 0 && !isPractice) {
        return { error: "hearts" };
    }

    if(isPractice) {
        await db.update(challengesProgress).set({
            completed: true,
        }).where(eq(challengesProgress.id, existingChallengeProgress.id));

        await db.update(userProgress).set({
            hearts: Math.min(currentChallengeProgress.hearts + 1, 5),
            points: currentChallengeProgress.points + 10,
        }).where(eq(userProgress.userId, userId));

        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/questions");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return { success: "Challenge completed" };
    }
    await db.insert(challengesProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentChallengeProgress.points + 10,
    }).where(eq(userProgress.userId, userId));
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/questions");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return { success: "Challenge completed" };
}