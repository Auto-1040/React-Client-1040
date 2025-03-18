import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/layout/Dashboard";
import Home from "./components/Home";
import { createBrowserRouter } from "react-router"
import ViewForms from "./components/ViewForms";
import UserInfo from "./components/forms/UserInfo";
import PersonalInformation from "./components/forms/PersonalInformation";
import AddressInformation from "./components/forms/AddressInformation";
import SpouseInformation from "./components/forms/SpouseInformation";
import FilingInformation from "./components/forms/FilingInformation";
import DependentsInformation from "./components/forms/DependentsInformation";
import CreateForm from "./components/CreateForm";
import ErrorPage from "./components/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <ErrorPage/>,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/dashboard', element: <Dashboard />,
                children: [
                    { path: 'view-forms', element: <ViewForms /> },
                    { path: 'create-1040', element: <CreateForm/> }
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
           

            { path: '/dashboard/create-1040/upload-pay-slip', element: <></> },
            { path: '/dashboard/create-1040/download', element: <></> },

            { path: '/dashboard/edit', element: <></> }
        ]
    }

])