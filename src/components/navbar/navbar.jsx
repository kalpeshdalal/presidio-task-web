/** @format */

import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import LogoutModel from "../modal/logoutModel";
import { useSelector } from "react-redux";
export const Navbar = () => {
    const userData = useSelector(
        (state) => state.authenticationReducer.userData
    );
    const [isLogoOutPop, setIsLogoOutPop] = useState(false);

    const handleCloseModal = () => {
        setIsLogoOutPop(false);
    };

    return (
        <div className="flex justify-between h-16 md:h-20 items-center w-full bg-[#662671] py-5 pl-5 fixed ">
            <div className=" ">
                <div className="text-[24px] font-bold text-white">
                    Welcome {userData?.firstName + " " + userData?.lastName} 🙏
                </div>
                <div className="text-[#dadada]">{userData?.role == 'buyer'? 'Buyer' :'Seller'}</div>
            </div>
            <div className="relative">
                <button
                    onClick={() => setIsLogoOutPop(!isLogoOutPop)}
                    className="text-white mr-3 md:mr-6"
                >
                    <CgProfile className=" text-[26px] md:text-4xl" />
                </button>

                {isLogoOutPop ? <LogoutModel onClose={handleCloseModal} /> : ""}
            </div>
        </div>
    );
};
