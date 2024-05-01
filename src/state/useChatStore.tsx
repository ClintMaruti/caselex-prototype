import { generateRandomAlphanumeric } from "@/lib/utils";
import { ChatHistory, Context } from "@/types";
import { create } from "zustand";

interface ChatStore {
    sessionId: string;
    setSessionId: () => void;
    currAnswers: string;
    context: Context[];
    setContext: (context: Context[]) => void;
    setCurrentAnswers: (answer: string) => void;
    chatHistory: ChatHistory[];
    setChatHistory: (chatHistory: ChatHistory[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    sessionId: "aosbsjbodivb",
    setSessionId: () => set({ sessionId: generateRandomAlphanumeric() }),
    currAnswers: "",
    setCurrentAnswers: (answers: string) => set({ currAnswers: answers }),
    chatHistory: [],
    setChatHistory: (chatHistory: ChatHistory[]) => set({ chatHistory: chatHistory }),
    context: [] as Context[],
    setContext: (context: Context[]) => set({ context: context }),
}));
