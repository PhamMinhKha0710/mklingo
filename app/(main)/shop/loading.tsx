import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const ShopLoading = () => {
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
                    <Skeleton className="h-[100px] w-[100px] rounded-lg mb-4" />
                    <Skeleton className="h-10 w-32 rounded-lg mb-3" />
                    <Skeleton className="h-6 w-80 rounded-lg mb-12" />
                    <div className="grid gap-4 w-full max-w-md">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopLoading;

