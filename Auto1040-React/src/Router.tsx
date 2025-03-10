import About from "./components/About";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/dashboard', element: <Dashboard/> },
            { path: '/dashboard/create-1040', element: <></> },

            { path: '/dashboard/create-1040/personal-information', element: <></> },
            { path: '/dashboard/create-1040/upload-pay-slip', element: <></> },
            { path: '/dashboard/create-1040/download', element: <></> },

            { path: '/dashboard/view', element: <></> },
            { path: '/dashboard/edit', element: <></> }
        ]
    }

])