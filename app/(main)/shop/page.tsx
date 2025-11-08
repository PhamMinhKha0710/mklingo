import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

const ShopPage = async () => {
    const userProgressData = await getUserProgress();
    const userSubscriptionData = await getUserSubscription();

    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgressData || !userProgressData.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgressData.activeCourse}
                    hearts={userProgressData.hearts}
                    points={userProgressData.points}
                    hasActiveSubscription={isPro}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    {/* Header Section */}
                    <div className="relative mb-12 text-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
                        </div>
                        <div className="relative">
                            <Image 
                                src="/images/shop.svg" 
                                alt="Shop" 
                                height={100} 
                                width={100}
                                className="mx-auto mb-4"
                            />
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
                                Shop
                            </h1>
                            <p className="text-gray-600 text-lg max-w-md mx-auto">
                                Spend your points on cool stuff or upgrade to Pro for unlimited learning
                            </p>
                        </div>
                    </div>

                    {/* Items Section */}
                    <Items
                        hearts={userProgressData.hearts}
                        points={userProgressData.points}
                        hasActiveSubscription={isPro}
                    />
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;

