import Footer from "@/component/layer/Footer";
import Header from "@/component/layer/Header";
import Navbar from "@/component/layer/Navbar";
import { Box } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface ContainerProps {
    children?: ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children }) => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header toggleNav={toggleNav} />
            <Navbar open={navOpen} onClose={() => setNavOpen(false)} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default MainLayout;
