import { parseSourceFromCtx } from "@/lib/utils";
import { useChatStore } from "@/state/useChatStore";
import { Context } from "@/types";
import axios from "axios";
import * as React from "react";
import { Button } from "./ui/button";

export const ChatArea: React.FC = () => {
    const { chatHistory, context, setSessionId } = useChatStore((state) => state);
    return (
        <>
            <div className="w-full flex justify-between items-center">
                <p>Chat with 10,000+ case files</p>
                <Button className="float-right" onClick={() => setSessionId()}>
                    Start new session
                </Button>
            </div>
            <div className="relative w-full max-h-96 border border-border rounded-md p-6 bg-slate-50 overflow-y-scroll flex flex-col justify-between">
                <div className="w-full  flex flex-col justify-end gap-3">
                    {chatHistory
                        ? chatHistory.map((ch, idx) => {
                              if ("AiChat" in ch) {
                                  return <AiResponce key={`${idx}-${ch}`} chat={ch.AiChat} context={context} />;
                              } else {
                                  return <HumanResponce key={`${idx}-${ch}`} chat={ch.HumanChat} />;
                              }
                          })
                        : ""}
                </div>
            </div>
        </>
    );
};

interface HumanResponceProps {
    chat: string;
}

const HumanResponce: React.FC<HumanResponceProps> = ({ chat }) => {
    return (
        <div className="w-full">
            <div className="w-1/2 float-right bg-yellow-50 p-4 rounded-md text-sm ">{chat === "" ? "Hi" : chat}</div>
        </div>
    );
};

interface AiResponceProps {
    chat: string;
    context: Context[];
}

const AiResponce: React.FC<AiResponceProps> = ({ chat, context }) => {
    // const docStore = useDocumentStore((state) => state);
    // const handleOpenDoc = (doc: string) => {
    //     docStore.setDoc(doc);
    //     docStore.setIsOpen(true);
    // };
    const handleDownload = async (blobName: string) => {
        console.log("🚀 ~ handleDownload ~ blobName:", blobName);
        try {
            const response = await axios.post("https://azure-blob-download-service-1.onrender.com/blob", { blobName }, { responseType: "blob" });
            console.log("🚀 ~ handleDownload ~ response:", response);

            // Create a blob URL for the downloaded file
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element and click it to trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", blobName);
            document.body.appendChild(link);
            link.click();
            link.remove(); // Clean up
        } catch (error) {
            console.error("Error downloading blob:", error);
            // Handle error
        }
    };
    return (
        <div className="w-full">
            <div className="w-1/2 bg-white p-4 rounded-md text-sm">
                <p>{chat}</p>
                {chat.includes("How may") ? null : (
                    <>
                        <p className="font-semibold text-[#282828] inline-flex space-y-2">Reference</p>
                        <div className="flex flex-col gap-1">
                            {parseSourceFromCtx(context)
                                .slice(0, 1)
                                .map((src, idx) => (
                                    <button
                                        key={`${idx}-${src}`}
                                        className="text-xs truncate text-[#685430] hover:underline"
                                        onClick={() => {
                                            handleDownload(src);
                                        }}
                                    >
                                        {src}
                                    </button>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
