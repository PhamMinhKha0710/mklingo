import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/ui/promo";
import { QUESTS } from "@/lib/constants";

const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {!isPro && (
                    <Promo />
                )}
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/images/quests.svg" alt="Questions" height={90} width={90} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Questions
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete questions by earning points.
                    </p>
                    <ul className="w-full">
                        {QUESTS.map((question) => {
                            const progress = Math.min((userProgress.points / question.value) * 100, 100);
                            
                            return (
                                <div 
                                    key={question.title}
                                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                >
                                    <Image 
                                        src="/images/points.svg" 
                                        alt="Points" 
                                        width={60} 
                                        height={60} 
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {question.title}
                                        </p>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;

