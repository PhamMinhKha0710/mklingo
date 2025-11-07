import { ExitModel } from "@/components/models/exit-model";

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <ExitModel />
            {children}
        </div>
    );
};

export default LessonLayout;