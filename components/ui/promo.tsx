"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
                {/* Header with Icon and Text */}
                <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-1.5 rounded-lg flex-shrink-0">
                        <Image 
                            src="/images/heart.svg" 
                            alt="Upgrade to Pro" 
                            height={24} 
                            width={24}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-purple-700 leading-tight">
                            Upgrade to Pro
                        </h3>
                        <p className="text-xs text-gray-600 leading-tight">
                            Get unlimited hearts and more features!
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <Link href="/shop">
                    <Button 
                        variant="supper" 
                        size="sm"
                        className="w-full"
                    >
                        Upgrade today
                    </Button>
                </Link>
            </div>
        </div>
    );
};