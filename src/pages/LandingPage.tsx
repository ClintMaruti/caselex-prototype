import { ChatArea } from "@/components/ChatArea";
import { SearchBar } from "@/components/SearchBar";
import { useChatStore } from "@/state/useChatStore";
import { Toaster } from "sonner";
export const LandingPage = () => {
    const { chatHistory } = useChatStore((state) => state);
    return (
        <div className="flex justify-center my-14 w-full">
            <Toaster position="top-center" richColors />
            <div className="flex flex-col items-center justify-around gap-3 w-full">
                <h1 className="w-full text-4xl inline-flex h-max text-center justify-center  items-center text-transparent bg-gradient-to-br from-[#FDA403] to-[#282828] bg-clip-text">
                    Your trusted, legal <br />
                    ally and compliance guide
                </h1>
                <div className="w-3/4 border-t border-0"></div>

                <div className="w-3/4 flex flex-col justify-center items-center gap-4">
                    {chatHistory.length ? <ChatArea /> : null}
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};
