/** @format */

import React, { useEffect, useState } from "react";
import { apiGET } from "../../utilies/apiHandler";
import PropertyCard from "../seller/propertyCard";
import { useSelector } from "react-redux";

const PropertyListComp = () => {
    const userData = useSelector(
        (state) => state.authenticationReducer.userData
    );
    const [propertyList, setPropertyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        noOfBedrooms: "",
        noOfBathrooms: "",
    });
    const itemsPerPage = 3;

    const getAllPropertiesList = async () => {
        try {
            const filterQuery = Object.entries(filters)
                .filter(([, value]) => value)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const response = await apiGET(
                `/v1/property/${userData?.id}?page=${currentPage}&limit=${itemsPerPage}&${filterQuery}`
            );

            if (response?.data?.status) {
                setPropertyList(response?.data?.data?.data);
                const totalItems = parseInt(
                    response?.data?.data?.totalItems,
                    10
                );
                setTotalPages(
                    Math.max(1, Math.ceil(totalItems / itemsPerPage))
                );
            } else {
                console.log(response?.data?.message || "Failed to fetch data");
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
            setTotalPages(1);
        }
    };
    const handleFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        getAllPropertiesList();
    }, [userData, currentPage, filters]);

    return (
        <div>
            <div className="p-5">
                <div className="flex gap-4 ">
                    <select
                        name="noOfBedrooms"
                        value={filters.noOfBedrooms}
                        onChange={handleFilterChange}
                        className="p-2 w-[160px] rounded border border-gray-300"
                    >
                        <option value="">All Bedrooms</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num} Bedrooms
                            </option>
                        ))}
                    </select>
                    <select
                        name="noOfBathrooms"
                        value={filters.noOfBathrooms}
                        onChange={handleFilterChange}
                        className="p-2 rounded border border-gray-300"
                    >
                        <option value="">All  Bathrooms</option>
                        {[1, 2, 3].map((num) => (
                            <option key={num} value={num}>
                                {num} Bathrooms
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap">
                {propertyList.map((property, index) => (
                    <div className="p-5" key={index}>
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default PropertyListComp;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1 || !totalPages) {
        return null;
    }

    return (
        <div className="flex justify-center items-center space-x-1 my-4 pb-10">
            <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 text-sm text-gray-500 bg-white rounded-md hover:bg-gray-100 disabled:text-gray-300"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => onPageChange(idx + 1)}
                    className={`px-4 py-2 text-sm ${
                        currentPage === idx + 1
                            ? "text-white bg-blue-500"
                            : "text-gray-700 bg-white"
                    } rounded-md hover:bg-blue-100`}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 text-sm text-gray-500 bg-white rounded-md hover:bg-gray-100 disabled:text-gray-300"
            >
                Next
            </button>
        </div>
    );
};
