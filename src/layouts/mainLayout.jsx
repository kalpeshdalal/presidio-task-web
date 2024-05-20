import { Outlet } from "react-router-dom"
import { Navbar } from "../components/navbar/navbar"
import { useState } from "react";

export const MainLayout = () => {
    
    return <>
        <div className="flex min-h-screen flex-col   ">
            <Navbar />
            <div className="text-black  mt-16 md:mt-20  ">
                <Outlet />
            </div>
        </div>
    </>
}