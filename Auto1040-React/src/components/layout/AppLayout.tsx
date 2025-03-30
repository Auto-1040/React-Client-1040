import { Outlet } from "react-router-dom"; // Ensure correct import
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer /> 
            
        </>
    );
};

export default AppLayout;
