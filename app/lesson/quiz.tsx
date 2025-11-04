    "use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { toast } from "sonner";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";

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
    const [pending, startTransition] = useTransition();
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

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    
    const onSelect = (id: number) => {
        if(status !== "none") return;

        setSelectedOption(id);
    };

    if (!challenge) {
        return (
            <>
                <Header
                    hearts={hearts}
                    percentage={percentage}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                <div className="flex-1">
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4 text-neutral-700">
                                🎉 Lesson completed!
                            </h1>
                            <p className="text-muted-foreground">
                                Great job! You've completed all challenges.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const onContinue = () => {
        if(!selectedOption) return;

        if(status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if(status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find(option => option.correct);
        if(!correctOption) return;
        if(correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                .then((response) => {
                    if(response?.error === "hearts") {
                        toast.error("You ran out of hearts! 💔");
                        return;
                    }
                    
                    if(response?.success) {
                        toast.success("Correct! ✨");
                    }
                    
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    // If this was practice (already completed before)
                    if(initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                })
                .catch(() => toast.error("Something went wrong."));
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                .then((response) => {
                    if(response?.error === "No hearts left") {
                        toast.error("No hearts left! 💔");
                        return;
                    }

                    if(response?.error === "Practice challenge cannot be reduced") {
                        setStatus("wrong");
                        return;
                    }

                    setStatus("wrong");
                    if(!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Something went wrong."));
            });
        }
    };

    return (
        <>
        <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                       {challenge.question}
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
                        disabled={pending}
                        type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
        />
            
        </>
    );
};