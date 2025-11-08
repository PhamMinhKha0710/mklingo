"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { use, useState, useTransition, useEffect } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { toast } from "sonner";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModel } from "@/store/use-hearts-model";
import { usePracticeModel } from "@/store/use-practice-model";


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
    const { open: openHeartsModal } = useHeartsModel();
    const { open: openPracticeModal } = usePracticeModel();

    useMount(() => {
        if(initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const {width, height} = useWindowSize();
    const router = useRouter();
    const [
        correctAudio,
        _c,
        correctControls
    ] = useAudio({src: "/audio/correct.mp3"});
    const [
        incorrectAudio,
        _i,
        incorrectControls
    ] = useAudio({src: "/audio/incorrect.mp3"});
    const [
        finishAudio,
        _f,
        finishControls
    ] = useAudio({src: "/audio/finish.mp3"});
    
    const [pending, startTransition] = useTransition();
    const [lessonId, setLessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHeart);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    }

    );
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.options || [];

    // Play finish audio when lesson is completed
    useEffect(() => {
        if (!challenge) {
            finishControls.play();
        }
    }, [challenge, finishControls]);

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
            {finishAudio}
            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                tweenDuration={1000}
            />
            <div className="flex flex-col gap-y-4 h-full">
                <Header
                    hearts={hearts}
                    percentage={100}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                <div className="flex flex-1 flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Image
                        src="/images/finish.svg"
                        alt="Finish"
                        width={100}
                        height={100}
                        className="hidden lg:block animate-bounce"
                    />
                    <Image
                        src="/images/finish.svg"
                        alt="Finish"
                        width={50}
                        height={50}
                        className="block lg:hidden animate-bounce"
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700 animate-in fade-in zoom-in duration-700 delay-300">
                        great job! <br/> you&apos;ve completed the lesson
                    </h1>
                    <div className="flex items-center gap-x-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
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
                        openHeartsModal();
                        return;
                    }
                    
                    correctControls.play();
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
                        incorrectControls.play();
                        setStatus("wrong");
                        return;
                    }

                    incorrectControls.play();
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
        {correctAudio}
        {incorrectAudio}
        {finishAudio}
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