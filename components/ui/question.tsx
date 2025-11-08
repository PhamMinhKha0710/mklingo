"use client";

import Link from "next/link";
import { QUESTS } from "@/lib/constants";
import { Progress } from "./progress";

type Props = {
    points: number;
};

export const Question = ({ points }: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-neutral-800">
                    Quests
                </h3>
                <Link href="/questions">
                    <span className="text-xs font-bold text-blue-500 hover:text-blue-600 uppercase cursor-pointer">
                        View All
                    </span>
                </Link>
            </div>

            {/* Quest List */}
            <ul className="space-y-2">
                {QUESTS.map((quest) => {
                    const progress = Math.min((points / quest.value) * 100, 100);
                    
                    return (
                        <li key={quest.value}>
                            <Link href="/questions">
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex-shrink-0">
                                        <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                                            <svg 
                                                className="w-4 h-4 text-orange-500" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-medium text-neutral-700 block mb-1">
                                            {quest.title}
                                        </span>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
