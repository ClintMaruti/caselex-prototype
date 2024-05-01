import { caseLexAgent } from "@/service/langChain";
import { useChatStore } from "@/state/useChatStore";
import { ChatHistory } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SearchBar: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setChatHistory, setCurrentAnswers, setContext, chatHistory, sessionId } = useChatStore((state) => state);
    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await caseLexAgent(search, sessionId);
            if (res.context.answer) {
                // const parseCh = constructChatHistory(res.context.chat_history);
                const chat_history: ChatHistory[] = [
                    {
                        HumanChat: res.input,
                    },
                    {
                        AiChat: res.context.answer,
                    },
                ];
                setChatHistory([...chatHistory, ...chat_history]), setCurrentAnswers(res.context.answer), setContext(res.context.context);
                setLoading(false);
                setSearch("");
                return;
            }
            setLoading(false);
            toast.error("There was an error fetching results");
        } catch (error) {
            toast.error("There was an error fetching results");
            setLoading(false);
        }
    };
    return (
        <form className="flex gap-2 w-full" onSubmit={handleSearch}>
            <Input
                disabled={isLoading}
                type="search"
                placeholder="Your Ai Legal tool"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <Button disabled={isLoading} type="submit">
                {isLoading ? "Loading..." : "Chat"}
            </Button>
        </form>
    );
};
