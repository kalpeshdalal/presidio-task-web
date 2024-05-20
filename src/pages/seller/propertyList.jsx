/** @format */

import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/buttonComp/buttonComp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGET } from "../../utilies/apiHandler";
import AddPropertyComp from "./addPropertyComp";
import PropertyCard from "./propertyCard";

const PropertyList = () => {
    const userData = useSelector(
        (state) => state.authenticationReducer.userData
    );
    const navigate = useNavigate();

    const [propertyList, setPropertyList] = useState([]);

    const getAllPropertiesList = async () => {
        try {
            const response = await apiGET(`/v1/property/get/${userData?.id}`);
            if (response?.data?.status) {
                setPropertyList(response?.data?.data);
            } else {
                console.log(data.message);
            }
        } catch (error) {}
    };
    useEffect(() => {
        getAllPropertiesList();
    }, [userData]);
    console.log(propertyList);

    return (
        <div>
            {propertyList?.length > 0 ? (
                <div>
                    <div className="flex items-center justify-between p-4  border-b-1">
                        <div className="text-2xl text-[#797979] font-bold">
                            Your Property List to sell{" "}
                        </div>
                        <div className="">
                            <PrimaryButton
                                text={"Add New"}
                                btnClass="p-2 rounded-lg"
                                onClick={() => navigate("/property/add")}
                            />
                        </div>
                    </div>
                    <div className="flex gap-6 flex-wrap">
                    {propertyList.map((property, index) => {
                        return (
                            <div className="p-5" key={index}>
                                <PropertyCard property={property} />
                            </div>
                        );
                    })}
                    </div>
                </div>
            ) : (
                <div className="p-5">
                    <AddPropertyComp />
                </div>
            )}
        </div>
    );
};

export default PropertyList;
