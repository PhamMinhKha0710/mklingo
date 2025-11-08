import { ExitModel } from "@/components/models/exit-model";
import { PracticeModel } from "@/components/models/practice-model";

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <ExitModel />
            <PracticeModel />
            {children}
        </div>
    );
};

export default LessonLayout;