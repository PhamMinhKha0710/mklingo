import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    value: number;
    variant: "points" | "hearts";
}

export const ResultCard = ({ value, variant }: Props) => {
    const imageSrc = variant == "hearts" ? "/images/heart.svg" : "/images/points.svg";
    
    return (
        <div className={cn(
            "rounded-2xl border-2 w-full transition-all hover:scale-105",
            variant === "points" && "border-orange-400 bg-orange-400",
            variant === "hearts" && "border-rose-500 bg-rose-500",
        )}>
            <div className={cn(
                "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                variant === "points" && "bg-orange-400",
                variant === "hearts" && "bg-rose-500",
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant === "points" && "text-orange-500",
                variant === "hearts" && "text-rose-500",
            )}>
                <Image
                alt="Icon"
                src={imageSrc}
                width={30}
                height={30}
                className="mr-1.5 animate-pulse"
                />
                {value}
            </div>
        </div>
    )
}