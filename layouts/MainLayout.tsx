import NavBar from "@/component/NavBar";
import Player from "@/component/Player";
import { Container } from "@mui/material";

import React, { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
}

const MainLayout: React.FC<ContainerProps> = ({ children }) =>
{
    return(
        <>
            <NavBar />
            <Container style = {{margin: '90px 0'}}>
                {children}
            </Container>
            <Player />
        </>
    )
}

export default MainLayout;