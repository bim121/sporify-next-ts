import MainLayout from "@/layouts/MainLayout";
import React from "react";

const Index = () => {
    return(
        <>
            <MainLayout>
                <div className="center">
                    <h1>Дорбро пожаловать</h1>
                    <h3>Здесь собраны лучшие треки!</h3>
                </div>
            </MainLayout>
            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100vw;
                    }
                `}
            </style>
        </>
    );
};


export default Index;