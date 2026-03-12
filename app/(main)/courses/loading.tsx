const CoursesLoading = () => {
    return (
        <div className="h-full max-w-[912px] mx-auto space-y-4">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="grid gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        </div>
    );
};

export default CoursesLoading;
