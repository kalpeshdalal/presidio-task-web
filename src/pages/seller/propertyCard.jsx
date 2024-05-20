/** @format */

import React, { useState } from "react";
import { FaHeart, FaInfoCircle } from "react-icons/fa";
import { apiGET, apiPOST } from "../../utilies/apiHandler";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PropertyCard = ({ property }) => {
    const userData = useSelector(
        (state) => state.authenticationReducer.userData
    );
    const [isOpen, setIsOpen] = useState(false);
    const [liked, setLiked] = useState(property?.isLikedByUser);
    const [likeCount, setLikeCount] = useState(property?.totalLikes || 0);
    const [sellerDetails, setSellerDetails] = useState({});
    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };
    console.log(property);

    const getSellerDetails = async () => {
        try {
            const response = await apiGET(
                `/v1/property/get-seller-details/${
                    property?.id || property?._id
                }`
            );
            console.log(response);
            if (response?.data?.status) {
                setSellerDetails(response?.data?.data);
                toast.success(
                    "We have successfully sent you owner details on your mailbox !"
                );
            } else {
            }
        } catch (error) {}
    };

    const handleLikeAPI = async () => {
        const response = await apiPOST("/v1/like/", {
            propertyId: property?.id || property?._id,
            userId: userData?.id,
            isLiked: !liked,
        });
        return response;
    };

    const toggleLike = async () => {
        const data = await handleLikeAPI();
        if (data && data.status) {
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        } else {
            console.error("Failed to update like status");
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-xl my-2 bg-white cursor-pointer">
            <img
                className="w-[400px] h-[280px]"
                src={
                    property.image ||
                    "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png"
                }
                alt="Property"
            />
            <div className="px-5 py-4">
                <div className="font-bold text-xl mb-2">
                    {property.noOfBedroom} BHK Apartment in {property.area},{" "}
                    {property.city}
                </div>
                <div className="flex gap-2">
                    <div className="bg-slate-300 rounded-2xl px-4 py-1 text-xs">
                        {property.noOfBedroom} BHK
                    </div>
                    <div className="bg-slate-300 rounded-2xl px-4 py-1 text-xs">
                        {property.noOfBathrooms} Bathroom
                    </div>
                    <div className="bg-slate-300 rounded-2xl px-4 py-1 text-xs">
                        #{property.city}
                    </div>
                </div>
                {sellerDetails?.firstName && sellerDetails?.lastName && (
                    <div className="mt-5 text-sm text-[#858585]">
                        Seller Name : {" " +sellerDetails?.firstName +" " +sellerDetails?.lastName}
                    </div>
                )}
                {sellerDetails?.email && (
                    <div className="mt-1 text-sm text-[#858585]">
                        Seller Email : {" " +sellerDetails?.email}
                    </div>
                )}
                {sellerDetails?.phone && (
                    <div className="mt-1 text-sm text-[#858585]">
                        Seller Phone : {" " +sellerDetails?.phone}
                    </div>
                )}

                {isOpen && (
                    <div className="text-gray-700 text-base mt-4">
                        <p>Address: {property.address}</p>
                        <p>Area : {property?.area}</p>
                        <p>City: {property.city}</p>
                    </div>
                )}
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <button
                    onClick={toggleLike}
                    className={`text-xl flex gap-2 ${
                        liked ? "text-red-500" : "text-gray-400"
                    }`}
                >
                    {likeCount} <FaHeart className="text-2xl" />
                </button>
                <button
                    onClick={toggleDetails}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Details
                </button>
                <button
                    disabled={
                        userData?.id == property?.createdBy ||
                        userData?._id == property?.createdBy
                    }
                    onClick={() => getSellerDetails()}
                    className={`${
                        userData?.id == property?.createdBy ||
                        userData?._id == property?.createdBy
                            ? "bg-green-200"
                            : "bg-green-500 hover:bg-green-700"
                    }  text-white font-bold py-2 px-4 rounded flex items-center`}
                >
                    <FaInfoCircle className="mr-2" /> I'm Interested
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
