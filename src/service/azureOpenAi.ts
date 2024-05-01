import { $http } from "@/config/axiosInstance";

export const downloadBlob = async (blobName: string) => {
    try {
        const res = await $http.post("/blob", {
            blobName,
        });
        if (res.data === "Error retrieving blob") {
            return;
        }
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
