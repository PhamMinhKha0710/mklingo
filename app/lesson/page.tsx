import { getLesson, getUserProgress } from "@/db/queries";
import { notFound, redirect } from "next/navigation";
import { Quiz } from "./quiz";


const LessonPage = async () => {
    const lessonData = await getLesson();
    const userProgressData = await getUserProgress();

    const [lesson, userProgress] = await Promise.all([
        lessonData,
        userProgressData,
    ]);
    if(!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;
    return (
    <Quiz
        initialLessonId={lesson.id} 
        initialLessonChallenges={lesson.challenges} 
        initialHeart={userProgress.hearts} 
        initialPercentage={initialPercentage} 
        userSubscription={undefined}
    />
    );
};

export default LessonPage;