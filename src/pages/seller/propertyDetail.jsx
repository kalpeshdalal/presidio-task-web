/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputCompAuth from "../../components/common/InputComp/inputCompAuth";
import PrimaryButton from "../../components/common/buttonComp/buttonComp";
import { toast } from "react-toastify";
import { apiGET, apiPUT } from "../../utilies/apiHandler";

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        city: "",
        area: "",
        noOfBedroom: "",
        noOfBathrooms: "",
        address: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            try {
                const response = await apiGET(
                    `/v1/property/get-specific/${id}`
                );
                console.log(response);
                if (response?.status === 200) {
                    setProperty({
                        city: response?.data?.data?.city,
                        area: response?.data?.data?.area,
                        noOfBedroom: response?.data?.data?.noOfBedroom,
                        noOfBathrooms: response?.data?.data?.noOfBathrooms,
                        address: response?.data?.data?.address,
                        image:  response?.data?.data?.image,
                    });
                } else {
                    toast.error("Failed to fetch property details");
                }
            } catch (error) {
                toast.error("Error fetching property details");
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchProperty();
        }
    }, [id]);

    const handleChange = (key, value) => {
        setProperty((prev) => ({ ...prev, [key]: value }));
    };

    const updateProperty = async () => {
        if (!id) return;

        setIsLoading(true);
        try {
            const response = await apiPUT(`/v1/property/${id}`, property);
            if (response?.status === 200) {
                toast.success("Property updated successfully!");
                navigate("/");
            } else {
                toast.error("Failed to update property");
            }
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center mb-5">
                Edit Property
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputCompAuth
                    label="City"
                    value={property.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                />
                <InputCompAuth
                    label="Area"
                    value={property.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                />
                <InputCompAuth
                    label="Number of Bedrooms"
                    value={property.noOfBedroom}
                    onChange={(e) =>
                        handleChange("noOfBedroom", e.target.value)
                    }
                />
                <InputCompAuth
                    label="Number of Bathrooms"
                    value={property.noOfBathrooms}
                    onChange={(e) =>
                        handleChange("noOfBathrooms", e.target.value)
                    }
                />
                <InputCompAuth
                    label="Address"
                    value={property.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
                <InputCompAuth
                    label="Image Link"
                    value={property.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                />
            </div>
            <div className="flex justify-center mt-6">
                <PrimaryButton
                    text="Update Property"
                    onClick={updateProperty}
                    loading={isLoading}
                    btnClass="h-12 w-full md:w-auto px-10 rounded-lg"
                />
            </div>
        </div>
    );
};

export default PropertyDetail;
