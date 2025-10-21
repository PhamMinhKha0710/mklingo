
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";


type Props = {
    activeCourse: { imageSrc: string; title: string; };
    headers: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const UserProgress = ({activeCourse, 
    points, 
    headers, 
    hasActiveSubscription
}: Props) => {
    return(
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
               <Button variant="ghost" size="sm">
                <Image 
                src={activeCourse.imageSrc} 
                alt={activeCourse.title}
                width={32}
                height={32}
                className="rounded-md border"
                />
               </Button>
            </Link>
            <Link href="/shop">
               <Button variant="ghost" className="text-orange-500">
                <Image 
                src="/images/points.svg"
                alt= "point"
                width={28}
                height={28}
                className="mr-2"
                />
                {points}
               </Button>
            </Link>
            <Link href="/shop">
               <Button variant="ghost" className="text-rose-500">
                <Image 
                src="/images/heart.svg"
                alt= "Heart"
                width={22}
                height={22}
                className="mr-2"
                />
                {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : headers}
               </Button>
            </Link>

        </div>
    );
};