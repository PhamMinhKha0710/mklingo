const LessonLoading = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse">Loading lesson...</p>
        </div>
    );
};

export default LessonLoading;
