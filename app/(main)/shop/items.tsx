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
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Refill Hearts Card */}
                <div className="flex flex-col">
                    <div className="relative bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-pink-200 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0">
                                <div className="bg-white p-3 rounded-2xl shadow-md">
                                    <Image 
                                        src="/images/heart.svg" 
                                        alt="Heart" 
                                        height={48} 
                                        width={48}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                        Refill Hearts
                                    </h3>
                                <p className="text-sm text-gray-600">
                                        Get back to learning
                                    </p>
                            </div>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">Instantly restore all hearts</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">Continue learning without waiting</span>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mt-auto">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Image 
                                    src="/images/points.svg" 
                                    alt="Points" 
                                    height={32} 
                                    width={32}
                                />
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-gray-900">
                                    {POINTS_TO_REFILL}
                                </span>
                                    <span className="text-base text-gray-600">points</span>
                                </div>
                            </div>
                            
                            <Button
                                onClick={onRefillHearts}
                                disabled={pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL}
                                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base"
                            >
                                {hearts === MAX_HEARTS ? (
                                    "Full Hearts"
                                ) : points < POINTS_TO_REFILL ? (
                                    "NOT ENOUGH"
                                ) : (
                                    "Refill Now"
                                )}
                            </Button>
                        
                            {/* Status Messages */}
                            <div className="mt-3 min-h-[24px]">
                        {hearts === MAX_HEARTS && (
                                    <div className="text-center">
                                        <span className="inline-flex items-center text-xs text-green-700 font-semibold bg-green-100 px-3 py-1.5 rounded-full">
                                            Hearts are full!
                                </span>
                            </div>
                        )}
                        
                        {points < POINTS_TO_REFILL && hearts < MAX_HEARTS && (
                                    <div className="text-center">
                                        <span className="text-xs text-red-700 font-semibold bg-red-100 px-3 py-1.5 rounded-full inline-block">
                                    Need {POINTS_TO_REFILL - points} more points
                                </span>
                            </div>
                        )}
                            </div>
                    </div>
                </div>
            </div>

            {/* Unlimited Hearts Card */}
                <div className="flex flex-col">
                    <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-purple-200 flex-1 flex flex-col">
                        {/* Active Badge */}
                    {hasActiveSubscription && (
                            <div className="absolute top-4 right-4 z-10">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-2 rounded-full shadow-lg">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                <span>ACTIVE</span>
                            </span>
                        </div>
                    )}
                    
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0">
                                <div className="bg-white p-3 rounded-2xl shadow-md">
                                    <Image 
                                        src="/images/sitting.svg" 
                                        alt="Unlimited" 
                                        height={48} 
                                        width={48}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 pr-16">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                            Unlimited Hearts
                                        </h3>
                                    <span className="text-xs font-bold text-purple-700 bg-purple-200 px-2.5 py-1 rounded-full">
                                            PRO
                                        </span>
                                    </div>
                                <p className="text-sm text-gray-600">
                                        Learn without limits
                                    </p>
                            </div>
                        </div>
                        
                        {/* Features */}
                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">Unlimited hearts forever</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">No waiting, no interruptions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">Cancel anytime</span>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mt-auto">
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        $20
                                    </span>
                                    <span className="text-base text-gray-600">/month</span>
                                </div>
                            </div>
                            
                            <Button
                                onClick={onUpgrade}
                                disabled={pending}
                                className={`
                                    w-full font-bold py-3 px-6 rounded-xl transition-all duration-200 text-base
                                    ${hasActiveSubscription 
                                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                                        : 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl'
                                    }
                                `}
                            >
                                {hasActiveSubscription ? "SETTINGS" : "Upgrade Now"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

