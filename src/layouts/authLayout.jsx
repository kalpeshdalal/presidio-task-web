import { Link, Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <div className="bg-[#f9e9ff] ">
            <div className="">
                <div className="flex min-h-screen  ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}