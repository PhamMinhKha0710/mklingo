import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { lessons, units as UnitsSchema } from "@/db/schema";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";

import { redirect } from "next/navigation";
import  { Unit }  from "./unit";
import { Promo } from "@/components/ui/promo";
import { Question } from "@/components/ui/question";


const LearnPage = async () => {
    const userProgressData =  getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        courseProgress,
        units,
        lessonPercentage,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        courseProgressData,
        unitsData,
        lessonPercentageData,
        userSubscriptionData,
    ]);

    if(!userProgress || !userProgress.activeCourse) {
         redirect("/courses");
    }
    if(!courseProgress){
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={!!userSubscription?.isActive}
                />
                {!isPro && (
                    <Promo />
                )}
                <Question points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {units.map((unit) => (
                    <div key={unit.id} className="mt-10">
                        <Unit 
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect&{
                                unit: typeof UnitsSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>

            
        </div>
    );

}

export default LearnPage;