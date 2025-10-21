import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";


const LearnPage = async () => {
    const userProgressData =  getUserProgress();

    const [
        userProgress,
    ] = await Promise.all([
        userProgressData,
    ]);

    if(!userProgress || !userProgress.activeCourse) {
        return redirect("/courses");
    }
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                activeCourse={{ title: "English", imageSrc: "/images/eg.svg"}}
                hearts={5}
                points={100}
                hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="English"/>
                <div className="space-y-4">
                </div>
            </FeedWrapper>

            
        </div>
    );

}

export default LearnPage;