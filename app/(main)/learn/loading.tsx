import { Loader } from "lucide-react";

const LearnLoading = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4 animate-in fade-in duration-200">
            <Loader className="h-10 w-10 text-white-500 animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
    );
};

export default LearnLoading;