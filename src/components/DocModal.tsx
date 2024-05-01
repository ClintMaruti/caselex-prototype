import { useDocumentStore } from "@/state/useDocumentStore";
import { Modal } from "flowbite-react";

export const DocModal = () => {
    const { isOpen } = useDocumentStore((state) => state);
    return <Modal show={isOpen}>DocModal</Modal>;
};
