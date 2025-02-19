import { Outlet } from "react-router-dom";
import Navbar from "../pages/sheard/Navbar";
import Footer from "../pages/sheard/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;