"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialLessonId: number;
    initialHeart: number;
    initialPercentage: number;
    initialLessonChallenges: typeof challenges.$inferSelect & {
        completed: boolean;
        options: typeof challengesOptions.$inferSelect[];
    }[];
    userSubscription: any;
}

export const Quiz = ({
    initialLessonId,
    initialHeart,
    initialPercentage,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHeart);
    const [percentage, setPercentage] = useState(50 || initialPercentage);
    const [lessonChallenges, setLessonChallenges] = useState(initialLessonChallenges);

    return (
        <>
        <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.activeSubscription}

        />
        </>
    );
};