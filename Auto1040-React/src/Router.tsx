import About from "./components/About";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { createBrowserRouter } from "react-router"
import ViewForms from "./components/ViewForms";
import UserInfo from "./components/UserInfo";
import PersonalInformation from "./components/PersonalInformation";
import AddressInformation from "./components/AddressInformation";
import SpouseInformation from "./components/SpouseInformation";
import FilingInformation from "./components/FilingInformation";
import DependentsInformation from "./components/DependentsInformation";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/dashboard', element: <Dashboard />,
                children: [
                    {
                        path: '/dashboard/user-information', element: <UserInfo />,
                        children: [
                            { path: 'dashboard/user-information/personal-information', element: <PersonalInformation /> },
                            { path: "dashboard/user-information/spouse-information", element: <SpouseInformation /> },
                            { path: "dashboard/user-information/address-information", element: <AddressInformation /> },
                            { path: "dashboard/user-information/filing-information", element: <FilingInformation /> },
                            { path: "dashboard/user-information/dependents-information", element: <DependentsInformation /> }

                        ]
                    },
                    { path: '/dashboard/view-forms', element: <ViewForms /> },
                ]
            },
            { path: '/dashboard/create-1040', element: <></> },

            { path: '/dashboard/create-1040/upload-pay-slip', element: <></> },
            { path: '/dashboard/create-1040/download', element: <></> },

            { path: '/dashboard/edit', element: <></> }
        ]
    }

])