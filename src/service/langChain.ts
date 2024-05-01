import { Chat } from "@/types";
import { HumanMessage } from "@langchain/core/messages";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

const chat_history = [];

export const caseLexAgent = async (caseLex: string, sessionId: string): Promise<Chat> => {
    const humanMsg = new HumanMessage({ content: caseLex });
    chat_history.push(humanMsg);
    const remoteChain = new RemoteRunnable({
        url: "http://20.55.25.237:8000/caselex-ai/",
    });
    const result = (await remoteChain.invoke({ input: caseLex }, { configurable: { session_id: sessionId } })) as Chat;
    return result;
};
