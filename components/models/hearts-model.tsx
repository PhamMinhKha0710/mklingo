"use client"
import { useHeartsModel } from "@/store/use-hearts-model";
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


export const HeartsModel = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModel();

    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push("/store")
    }

    if(!isClient) return null;

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/images/mascot_sad.svg" height={120} width={120} alt="Mascot" />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Pro for unlimited hearts, or purchase them in the store.
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
                            router.push("/store");
                        }}
                        >
                            Get unlimited hearts
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
                            No thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}