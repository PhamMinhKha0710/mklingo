"use client"
import { useExitModel } from "@/store/use-exit-model";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
export const ExitModel = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModel();

    useEffect(() => setIsClient(true), []);
    if(!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/images/mascot_sad.svg" height={120} width={120} alt="Mascot" />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">Wait, don&apos;t go!</DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You&apos;re about to leave the lesson. All progress will be lost.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button 
                        variant="primary" 
                        className="w-full" 
                        size="lg" 
                        onClick={close}
                        >
                            Keep learning
                        </Button>
                        <Button 
                        variant="dangerOutline" 
                        className="w-full" 
                        size="lg" 
                        onClick={() => {
                            close();
                            router.push("/learn");
                        }}
                        >
                            End session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}