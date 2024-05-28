/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPOST } from "../../utilies/apiHandler";
import { useSelector } from "react-redux";
import InputCompAuth from "../../components/common/InputComp/inputCompAuth";
import PrimaryButton from "../../components/common/buttonComp/buttonComp";
import { toast } from "react-toastify";

const AddPropertyComp = () => {
    const [formData, setFormData] = useState({
        city: "",
        area: "",
        noOfBedroom: "",
        noOfBathrooms: "",
        address: "",
        image: "",
        active: true,
    });
    const [errors, setErrors] = useState({
        city: "",
        area: "",
        noOfBedroom: "",
        noOfBathrooms: "",
        address: "",
        image: "",
        active: "",
    });
    const labels = [
        "City",
        "Area",
        "Number of Bedrooms",
        "Number of Bathrooms",
        "Address",
        "Image Link",
    ];
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: "" }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.city.trim()) {
            newErrors.city = "City is required.";
            isValid = false;
        }
        if (!formData.area.trim()) {
            newErrors.area = "Area is required.";
            isValid = false;
        }
        if (!formData.noOfBedroom) {
            newErrors.noOfBedroom = "Number of bedrooms is required.";
            isValid = false;
        }
        if (!formData.noOfBathrooms) {
            newErrors.noOfBathrooms = "Number of bathrooms is required.";
            isValid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = "Address is required.";
            isValid = false;
        }
        const urlRegex =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (formData?.image && !urlRegex.test(formData.image.trim())) {
            newErrors.image = "Please enter a valid URL for the image.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const submitHandler = async () => {
        if (!validateForm()) {
            toast.error("Please correct the errors before submitting.");
            return;
        }
        setIsLoading(true);
        if(!formData?.image?.trim()){
            setFormData({
                ...formData,
                image:'https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png'
            })
        }
        try {
            const response = await apiPOST("/v1/property/", formData);
            if (response?.status === 201) {
                toast.success("Property Added Successfully!");
                navigate("/");
                location.reload();
            } else {
                toast.error(response?.data?.message || "Error adding property");
            }
        } catch (error) {
            console.error("Error during property addition:", error);
            toast.error("Property addition failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="text-2xl text-[#797979] font-bold">
                Add Your New Property to Sell
            </div>
            <div className="md:mt-6 mt-10 grid grid-cols-1 md:grid-cols-2  gap-x-8">
                {[
                    "city",
                    "area",
                    "noOfBedroom",
                    "noOfBathrooms",
                    "address",
                    "image",
                ].map((field, index) => (
                    <div className="mb-6" key={index}>
                        <InputCompAuth
                            label={labels[index]}
                            value={formData[field]}
                            onChange={(e) =>
                                handleChange(field, e.target.value)
                            }
                            error={errors[field]}
                        />
                    </div>
                ))}
               
            </div>
            <div className=" w-full flex justify-center">
                <div className="w-[400px]">
                    <PrimaryButton
                        text="Add Property"
                        btnClass="h-12 w-full rounded-lg"
                        loading={isLoading}
                        onClick={submitHandler}
                    />
                    </div>
                </div>
        </div>
    );
};

export default AddPropertyComp;
