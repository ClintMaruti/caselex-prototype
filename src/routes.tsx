import { createBrowserRouter } from "react-router-dom";
import { MainContainer } from "./container/MainContainer";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainContainer />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
        ],
    },
]);
