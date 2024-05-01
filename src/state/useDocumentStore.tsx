import { create } from "zustand";

interface DocumentStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    doc: string;
    setDoc: (doc: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
    isOpen: false,
    doc: "",
    setIsOpen: (value: boolean) => set({ isOpen: value }),
    setDoc: (doc: string) => set({ doc: doc }),
}));
