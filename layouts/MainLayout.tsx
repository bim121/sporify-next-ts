import NavBar from "@/component/NavBar";
import Player from "@/component/Player";
import { Container } from "@mui/material";
import React, { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            <Container
               
                maxWidth={false}          
                disableGutters            
            >
                {children}
            </Container>
            <Player />
        </>
    );
}

export default MainLayout;