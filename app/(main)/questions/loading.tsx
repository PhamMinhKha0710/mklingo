import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const QuestsLoading = () => {
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
                    <Skeleton className="h-8 w-32 rounded-lg mb-6" />
                    <Skeleton className="h-6 w-80 rounded-lg mb-6" />
                    <ul className="w-full space-y-0">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center w-full p-4 gap-x-4 border-t-2"
                            >
                                <Skeleton className="h-[60px] w-[60px] rounded-lg flex-shrink-0" />
                                <div className="flex flex-col gap-y-2 w-full">
                                    <Skeleton className="h-7 w-40 rounded" />
                                    <Skeleton className="h-3 w-full rounded-full" />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsLoading;

