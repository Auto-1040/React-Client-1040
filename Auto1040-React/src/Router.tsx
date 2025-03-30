import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/layout/Dashboard";
import { createBrowserRouter } from "react-router"
import ViewForms from "./components/ViewForms";
import UserInfo from "./components/forms/UserInfo";
import PersonalInformation from "./components/forms/PersonalInformation";
import AddressInformation from "./components/forms/AddressInformation";
import SpouseInformation from "./components/forms/SpouseInformation";
import DependentsInformation from "./components/forms/DependentsInformation";
import ErrorPage from "./components/ErrorPage";
import CreateForm from "./components/generateForm/CreateForm";
import Contact from "./components/footerComponents/Contact";
import HomePage from "./components/Home";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <ErrorPage/>,
        children: [
            { path: '/', element: <HomePage /> },
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
                    { path: "dependents", element: <DependentsInformation /> }
                ]
            },
           {
            path:'contact', element:<Contact/>
           }

         

        ]
    }

])