import { Button } from "@/components/ui/button";
import { ArrowLeft, InfinityIcon } from "lucide-react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useExitModel } from "@/store/use-exit-model";


type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
}
export const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
    const { open } = useExitModel();
    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 
        items-center justify-between max-w-[1140px] mx-auto w-full">
            <X
            onClick={open}
            className="text-slate-500 hover:opacity-75 transition cursor-pointer"
            />
            <Progress value={percentage}/>
            <div className="text-rose-500 flex items-center font-bold">
                <Image 
                src="/images/heart.svg" 
                alt="Heart"
                 width={22} 
                 height={22} 
                 className="mr-2"/>
                {hasActiveSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3]"/> : hearts}
            </div>




        </header>
    );
};