"use client"
import { usePracticeModel } from "@/store/use-practice-model";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";


export const PracticeModel = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModel();

    useEffect(() => setIsClient(true), []);

    if(!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/images/heart.svg" height={100} width={100} alt="Heart" />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Practice lesson
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Use practice lesson to regain hearts and points. You cannot loose harts or points in practice mode.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button 
                        variant="primary" 
                        className="w-full" 
                        size="lg" 
                        onClick={() => {
                            close();
                        }}
                        >
                            I understand
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}