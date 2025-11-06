import { create } from "zustand";

type HeartsModalState = {
    hearts: number;
    setHearts: (hearts: number) => void;
};

export const useHeartsModel = create<HeartsModalState>((set) => ({
    hearts: 5,
    setHearts: (hearts: number) => set({ hearts }),
}));