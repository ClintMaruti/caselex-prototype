import { AiChat, ChatHistory, Context, HumanChat } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseSourceFromCtx(context: Context[]): string[] {
    const ctx: string[] = [];
    context.forEach((cx) => {
        const txt = cx.metadata.source.split("/").pop();
        if (txt) {
            ctx.push(txt);
        }
    });
    const removeDup = new Set(ctx);
    return Array.from(removeDup);
}

export const constructChatHistory = (chat_history: Array<AiChat | HumanChat>): ChatHistory[] => {
    const results: ChatHistory[] = [];
    chat_history.forEach((chat) => {
        if ("tool_calls" in chat) {
            results.push({ AiChat: chat.content });
        } else {
            results.push({ HumanChat: chat.content });
        }
    });
    return results;
};

export const generateRandomAlphanumeric = (length: number = 10): string => {
    const lettersAndDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const result = Array.from({ length }).map(() => lettersAndDigits.charAt(Math.floor(Math.random() * lettersAndDigits.length)));
    return result.join("");
};
