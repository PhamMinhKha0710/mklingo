"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { Courses, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
    const {userId} = await auth();
    const user = await currentUser();
    if(!userId || !user) {
        throw new Error("Unauthorized");
    }
    const course = await getCourseById(courseId);
    if(!course) {
        throw new Error("Course not found");
    }

    //TODO: Enable once units and lessons are added
    // if(!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course has no units or lessons");
    // }

    const existingUserProgress = await getUserProgress();

    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            UserName: user.firstName || "User",
            UserImageSrc: user.imageUrl || "/images/mascot.svg",
        });

        revalidatePath("/learn");
        revalidatePath("/courses");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        UserId: userId,
        activeCourseId: courseId,
        UserName: user.firstName || "User",
        UserImageSrc: user.imageUrl || "/images/mascot.svg",

    });

    revalidatePath("/learn");
    revalidatePath("/courses");
    redirect("/learn");
    
};
