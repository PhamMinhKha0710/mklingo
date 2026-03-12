"use client";

import dynamic from "next/dynamic";
import { useExitModel } from "@/store/use-exit-model";
import { useHeartsModel } from "@/store/use-hearts-model";
import { usePracticeModel } from "@/store/use-practice-model";

const ExitModel = dynamic(() => import("@/components/models/exit-model").then(m => m.ExitModel), { ssr: false });
const HeartsModel = dynamic(() => import("@/components/models/hearts-model").then(m => m.HeartsModel), { ssr: false });
const PracticeModel = dynamic(() => import("@/components/models/practice-model").then(m => m.PracticeModel), { ssr: false });

export const Modals = () => {
    const isExitOpen = useExitModel((s) => s.isOpen);
    const isHeartsOpen = useHeartsModel((s) => s.isOpen);
    const isPracticeOpen = usePracticeModel((s) => s.isOpen);

    return (
        <>
            {isExitOpen && <ExitModel />}
            {isHeartsOpen && <HeartsModel />}
            {isPracticeOpen && <PracticeModel />}
        </>
    );
};
