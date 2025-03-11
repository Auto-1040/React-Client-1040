import About from "./components/About";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { createBrowserRouter } from "react-router"
import ViewForms from "./components/ViewForms";
import UserInfo from "./components/Forms/UserInfo";
import PersonalInformation from "./components/Forms/PersonalInformation";
import AddressInformation from "./components/Forms/AddressInformation";
import SpouseInformation from "./components/Forms/SpouseInformation";
import FilingInformation from "./components/Forms/FilingInformation";
import DependentsInformation from "./components/Forms/DependentsInformation";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/dashboard', element: <Dashboard />,
                children: [
                    { path: 'view-forms', element: <ViewForms /> }
                ]
            },
            {
                path: '/dashboard/user-information', element: <UserInfo />,
                children: [
                    { path: 'personal', element: <PersonalInformation /> },
                    { path: "spouse", element: <SpouseInformation /> },
                    { path: "address", element: <AddressInformation /> },
                    { path: "filing", element: <FilingInformation /> },
                    { path: "dependents", element: <DependentsInformation /> }
                ]
            },
           
            { path: '/dashboard/create-1040', element: <></> },

            { path: '/dashboard/create-1040/upload-pay-slip', element: <></> },
            { path: '/dashboard/create-1040/download', element: <></> },

            { path: '/dashboard/edit', element: <></> }
        ]
    }

])