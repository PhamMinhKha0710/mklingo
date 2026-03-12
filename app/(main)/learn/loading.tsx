const LearnLoading = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6 animate-in fade-in duration-150">
            <div className="w-[280px] space-y-4">
                <div className="h-24 rounded-xl bg-muted animate-pulse" />
                <div className="h-32 rounded-xl bg-muted animate-pulse" />
                <div className="h-20 rounded-xl bg-muted animate-pulse" />
            </div>
            <div className="flex-1 space-y-6">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
                            <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnLoading;