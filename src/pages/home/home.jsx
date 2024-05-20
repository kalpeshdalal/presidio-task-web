/** @format */

import { useSelector } from "react-redux";
import PropertyList from "../seller/propertyList";
import PropertyListComp from "../buyer/propertyListComp";

export const Home = () => {
    const userData = useSelector(
        (state) => state.authenticationReducer.userData
    );

    return (
        <div className="h-[80vh] w-full">
            {userData?.role === "seller" ? <PropertyList /> : <div><PropertyListComp/></div>}
        </div>
    );
};
