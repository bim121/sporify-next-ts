import MainLayout from "@/layouts/MainLayout";
import React from "react";
import Footer from '@/component/Footer';
const Index = () => {
    return (
        <>
            <MainLayout>
                <div className="center">
                    <h1>Welcome!</h1>
                    <h3>Listen&Create music now!</h3>
                    <button className="start-button">Start</button>
                </div>
            </MainLayout>
            <Footer/>
            <style jsx>
                {`
                    .center {
                        
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: cover;
                        height: 80vh;
                        background: linear-gradient(135deg, #121212,rgb(187, 187, 187));
                        color: white;
                        text-align: center;
                        border-radius: 20px;
                        padding: 20px;
                    }
                    h1 {
                        font-size: 48px;
                        margin-bottom: 20px;
                    }
                    h3 {
                        font-size: 24px;
                        margin-bottom: 40px;
                        font-weight: 400;
                    }
                    .start-button {
                        padding: 15px 30px;
                        font-size: 18px;
                        font-weight: bold;
                        color:rgb(206, 206, 206);
                        background-color:rgb(94, 94, 94);
                        border: none;
                        border-radius: 30px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    .start-button:hover {
                        background-color:rgb(65, 65, 65);
                    }
                `}
            </style>
        </>
    );
};

export default Index;