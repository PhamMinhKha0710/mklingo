"use client";

import { refillHearts } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

// Shop constants - có thể điều chỉnh các giá trị này
export const MAX_HEARTS = 5;
export const POINTS_TO_REFILL = 50;
export const HEARTS_TO_REFILL = 5;
export const POINTS_PER_CHALLENGE = 10;

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) {
            return;
        }

        startTransition(() => {
            refillHearts()
                .then(() => {
                    toast.success("Hearts refilled!");
                })
                .catch(() => toast.error("Something went wrong."));
        });
    };

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="/images/heart.svg" alt="Heart" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL}
                >
                    {hearts === MAX_HEARTS ? (
                        "full"
                    ) : (
                        <div className="flex items-center">
                            <Image src="/images/points.svg" alt="Points" height={20} width={20} />
                            <p>{POINTS_TO_REFILL}</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src="/images/sitting.svg" alt="Unlimited" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button disabled={pending}>
                    {hasActiveSubscription ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    );
};

