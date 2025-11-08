import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardLoading = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <div className="space-y-4">
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Skeleton className="h-[90px] w-[90px] rounded-lg mb-6" />
                    <Skeleton className="h-8 w-48 rounded-lg mb-6" />
                    <Skeleton className="h-6 w-96 rounded-lg mb-6" />
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {[...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full p-2 px-4 rounded-xl"
                        >
                            <Skeleton className="h-6 w-6 rounded mr-4" />
                            <Skeleton className="h-12 w-12 rounded-full ml-3 mr-6" />
                            <Skeleton className="h-6 flex-1 rounded" />
                            <Skeleton className="h-6 w-20 rounded" />
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardLoading;

