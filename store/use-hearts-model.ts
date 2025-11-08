import { create } from "zustand";

type HeartsModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useHeartsModel = create<HeartsModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));