"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
type Props = {
    initialLessonId: number;
    initialHeart: number;
    initialPercentage: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        options: typeof challengesOptions.$inferSelect[];
    })[];
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
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.options || [];
    const onSelect = (id: number) => {
        if(status !== "none") return;

        setSelectedOption(id);
    };

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;

    return (
        <>
        <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.activeSubscription}
        />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                       {title}
                    </h1>
                    <div className="flex flex-col gap-y-4">
                        {challenge.type == "ASSIST" && (
                            <QuestionBubble question={challenge.question}/>
                        )}
                        <Challenge
                        options={options}
                        onSelect={onSelect}
                        status={status}
                        selectedOption={selectedOption}
                        disabled={false}
                        type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={() => {}}
        />
            
        </>
    );
};