import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const QuestsPage = async () => {
    const userProgressData = await getUserProgress();

    if (!userProgressData || !userProgressData.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgressData.activeCourse}
                    hearts={userProgressData.hearts}
                    points={userProgressData.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/images/quests.svg" alt="Quests" height={90} width={90} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points.
                    </p>
                    <ul className="w-full">
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                            <Image src="/images/points.svg" alt="Points" width={60} height={60} />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-xl font-bold">Earn 20 XP</p>
                                <Progress value={(userProgressData.points % 20) * 5} className="h-3" />
                            </div>
                        </div>
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                            <Image src="/images/points.svg" alt="Points" width={60} height={60} />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-xl font-bold">Earn 50 XP</p>
                                <Progress value={(userProgressData.points % 50) * 2} className="h-3" />
                            </div>
                        </div>
                        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                            <Image src="/images/points.svg" alt="Points" width={60} height={60} />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-xl font-bold">Earn 100 XP</p>
                                <Progress value={userProgressData.points % 100} className="h-3" />
                            </div>
                        </div>
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;

