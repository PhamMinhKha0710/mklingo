import { Button } from "@/components/ui/button";
import { useMedia, useKey } from "react-use";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none"| "completed";
    disabled?: boolean;
    lessonId?: number;
}
export const Footer = ({ onCheck, status, disabled, lessonId }: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);

    const isMobile = useMedia("(max-width: 1024px)");
    return (
        <footer
        className={cn(
            "lg:h-[140px] h-[100px] border-t-2",
            status === "correct" && "border-transparent bg-green-100",
            status === "wrong" && "border-transparent bg-rose-100",
        )}
        >
            <div className="max-w-[1140px] mx-auto h-full max-auto flex items-center justify-between px-6 lg:px-10"
            >
                {status === "correct" && (
                    <div className="text-green-600 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"
                        />
                        Nicely done!
                    </div>
                )}
                {status === "wrong" && (
                    <div className="text-rose-600 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"
                        />
                        Try again!
                    </div>
                )}
                {status === "completed" && (
                    <Button
                    variant="default"
                    size={isMobile ? "sm" : "lg"}
                    onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Practice again
                    </Button>
                )}

                <Button
                disabled={disabled}
                className={cn(
                    "ml-auto",
                    status === "completed" && "bg-green-400 hover:bg-green-400/90 border-green-500"
                )}
                onClick={onCheck}
                size={isMobile ? "sm" : "lg"}
                variant={status === "correct" ? "secondary" : status === "wrong" ? "danger" : status === "completed" ? "secondary" : "default"}
                >
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "wrong" && "Try Again"}
                    {status === "completed" && "Continue"}
                </Button>

            </div>

        </footer>
    );
};