import { downloadBlob } from "@/service/azureOpenAi";
import { useDocumentStore } from "@/state/useDocumentStore";
import saveAs from "file-saver";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Button } from "./ui/button";

export const DocumentView: React.FC = () => {
    const { doc } = useDocumentStore((state) => state);
    const handleDownload = async (blobName: string) => {
        try {
            const downloadedData = await downloadBlob(blobName);
            if (downloadedData) {
                saveAs(downloadedData, doc); // Assuming backend returns a blob
            }
        } catch (error) {
            console.error("Download error:", error);
        }
    };
    // const handleDownload = async () => {
    //     try {
    //         const response = await fetch('/api/download-word-document');

    //         if (!response.ok) {
    //             throw new Error(`Error downloading document: ${response.statusText}`);
    //         }

    //         const blob = await response.blob(); // Assuming backend returns a blob
    //         const fileName = 'your-document.docx'; // Replace with desired filename

    //         saveAs(blob, fileName);
    //     } catch (error) {
    //         console.error('Download failed:', error);
    //         // Handle download errors gracefully (e.g., display error message)
    //     }
    // };
    useEffect(() => {
        if (!isEmpty(doc)) {
            handleDownload(doc);
        }
    }, []);
    return (
        <div className="relative min-h-96 border border-border rounded-md p-2 bg-slate-50 overflow-y-scroll flex flex-col w-full gap-2">
            <div className="w-full">
                <Button className="top-0 right-0 float-right">close</Button>
            </div>
            <p className="text-center text-xs">{doc}</p>
        </div>
    );
};
