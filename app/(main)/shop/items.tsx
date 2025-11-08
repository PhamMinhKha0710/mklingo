"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/lib/constants";
import { createStripeUrl } from "@/actions/user-subscription";

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

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if(response.data) {
                        window.location.href = response.data;
                    } else {
                        toast.error("Something went wrong.");
                    }
                })
                .catch(() => toast.error("Something went wrong."));
        });
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Refill Hearts Card */}
            <div className="relative group h-fit">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 h-full">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-30"></div>
                                    <Image 
                                        src="/images/heart.svg" 
                                        alt="Heart" 
                                        height={60} 
                                        width={60}
                                        className="relative"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Refill Hearts
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Get back to learning
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Instantly restore all hearts</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Continue learning without waiting</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <Image 
                                    src="/images/points.svg" 
                                    alt="Points" 
                                    height={24} 
                                    width={24}
                                />
                                <span className="text-2xl font-bold text-gray-800">
                                    {POINTS_TO_REFILL}
                                </span>
                                <span className="text-sm text-gray-500">points</span>
                            </div>
                            
                            <Button
                                onClick={onRefillHearts}
                                disabled={pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL}
                                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                size="lg"
                            >
                                {hearts === MAX_HEARTS ? (
                                    <span className="flex items-center gap-2">
                                        <span>✓</span>
                                        <span>Full</span>
                                    </span>
                                ) : points < POINTS_TO_REFILL ? (
                                    "Not enough"
                                ) : (
                                    "Refill"
                                )}
                            </Button>
                        </div>
                        
                        {hearts === MAX_HEARTS && (
                            <div className="mt-3 text-center">
                                <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                                    <span>✓</span>
                                    <span>Hearts are full!</span>
                                </span>
                            </div>
                        )}
                        
                        {points < POINTS_TO_REFILL && hearts < MAX_HEARTS && (
                            <div className="mt-3 text-center">
                                <span className="text-sm text-red-600 font-medium">
                                    Need {POINTS_TO_REFILL - points} more points
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Unlimited Hearts Card */}
            <div className="relative group h-fit">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 h-full">
                    {hasActiveSubscription && (
                        <div className="absolute top-0 right-0 m-4">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-lg">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                <span>ACTIVE</span>
                            </span>
                        </div>
                    )}
                    
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30"></div>
                                    <Image 
                                        src="/images/sitting.svg" 
                                        alt="Unlimited" 
                                        height={60} 
                                        width={60}
                                        className="relative"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Unlimited Hearts
                                        </h3>
                                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                                            PRO
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Learn without limits
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>Unlimited hearts forever</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>No waiting, no interruptions</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span>Cancel anytime</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        $20
                                    </span>
                                    <span className="text-sm text-gray-500">/month</span>
                                </div>
                            </div>
                            
                            <Button
                                onClick={onUpgrade}
                                disabled={pending}
                                className={`
                                    font-bold px-6 py-2 rounded-xl transition-all duration-200
                                    ${hasActiveSubscription 
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                                        : 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl'
                                    }
                                `}
                                size="lg"
                            >
                                {hasActiveSubscription ? (
                                    <span className="flex items-center gap-2">
                                        <span>⚙️</span>
                                        <span>Settings</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <span>✨</span>
                                        <span>Upgrade</span>
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

