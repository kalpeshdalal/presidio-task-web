/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/authenticationReducer";
import PrimaryButton from "../common/buttonComp/buttonComp";
import { toast } from "react-toastify";
import { apiPOST } from "../../utilies/apiHandler";
import InputCompAuth from "../common/InputComp/inputCompAuth";

export const LoginComp = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        if (!email) {
            return "Email is required";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Please enter a valid email.";
        }
        return "";
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginHandler();
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Password is required";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const errorUpdate = {
            ...errors,
            [name]:
                name === "email"
                    ? validateEmail(value)
                    : validatePassword(value),
        };
        setErrors(errorUpdate);
        setFormData({ ...formData, [name]: value });
    };

    const loginHandler = async () => {
        const { email, password } = formData;
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        try {
            setIsLoading(true);
            const response = await apiPOST("/v1/auth/login", {
                email,
                password,
            });
            setIsLoading(false);
            if (response?.status === 200) {
                toast.success("Login Successful!");
                const { user, tokens } = response.data.data;
                dispatch(setUser({ user }));
                localStorage.setItem("isLogin", true);
                localStorage.setItem("accessToken", tokens.access.token);
                localStorage.setItem("refreshToken", tokens.refresh.token);
                navigate("/");
            } else {
                toast.error(response?.data?.data || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login.");
        }
    };

    return (
        <div className="w-[560px] m-3 md:m-6 p-4 md:p-9 bg-white rounded-2xl shadow-2xl">
            <div className=" text-base md:text-2xl text-[#717070]">
                Welcome Back 👋
            </div>
            <div className="text-xs mt-2 text-[#717070]" >
                Please Login your account.
            </div>
            <div className="md:mt-16 mt-10">
                <div>
                    <InputCompAuth
                        label="Email ID"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        onKeyDown={handleKeyDown}
                        name="email"
                        type="email"
                    />
                </div>
                <div className="mt-8">
                    <InputCompAuth
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        error={errors.password}
                        name="password"
                        type="password"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="text-[#A08CB1] hover:text-[#7e4caa]">
                        Forgot Password?
                    </button>
                </div>
                <div className="mt-6 md:mt-16 mb-3">
                    <PrimaryButton
                        text={"Log In"}
                        btnClass={"h-12 w-full rounded-lg"}
                        onClick={loginHandler}
                        loading={isLoading}
                    />
                    <div className="py-2 flex justify-center">
                        Don't have an Account?{" "}
                        <Link to={"/signup"} className="ml-1 hover:underline">
                            {" "}
                            Sign Up{" "}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
