import { NavBar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export const MainContainer = () => {
    return (
        <div className="w-full h-screen p-2">
            <NavBar />
            <Outlet />
        </div>
    );
};
