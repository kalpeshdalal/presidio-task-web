import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import InputCompAuth from "../common/InputComp/InputCompAuth";
import PrimaryButton from "../common/buttonComp/buttonComp";
import { apiPOST } from "../../utilies/apiHandler";

export const SignupComp = () => {
    const [formData, setFormData] = useState({
        role: 'buyer', firstName: '', lastName: '', phone: '', email: '', password: ''
    });
    const [errors, setErrors] = useState({
        role: '', firstName: '', lastName: '', phone: '', email: '', password: ''
    });
    const labels = ["First Name", "Last Name","Phone Number", "Email", "Password"]
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { role: '', firstName: '', lastName: '', phone: '', email: '', password: '', rePassword: '' };
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email.';
            isValid = false;
        }
    
        const passwordRegex = /^(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password should be at least 6 characters long and include at least one number.';
            isValid = false;
        }
    
    
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required and cannot be blank.';
            isValid = false;
        }
        if(!formData.lastName.trim()){
            newErrors.lastName = 'Last name is required and cannot be blank.';
            isValid = false;
        }
    
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Invalid phone number. Must be 10 digits.';
            isValid = false;
        }
        
    
        setErrors(newErrors);
        return isValid;
    };
    
    const signupHandler = async () => {
        if (!validateForm()) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await apiPOST("/v1/auth/signup", formData);
            console.log(response);
            if (response?.status === 201) {
                toast.success('Signup Successful!');
                navigate('/login');
            } else {
                toast.error(response?.data?.data || 'Error signing up');
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[560px] m-3 md:m-6 p-4 md:p-9 bg-white rounded-2xl shadow-2xl">
            <div className=" text-base md:text-2xl text-[#717070]">
                Create an Accout
            </div>
            <div className="md:mt-6 mt-10 ">
                <div className="mb-8 flex  items-center justify-between">
                    <label className="block mt-2 font-medium text-gray-700">
                        You want to continue as :
                    </label>
                    <div className="mt-2 flex gap-6">
                        <label className={`flex gap-2  ${formData.role === 'buyer'? "box-shadow-pink":""} items-center border pl-3 pr-5 py-[6px] rounded-3xl`}>
                            <input
                                type="radio"
                                className="w-4 h-4"
                                name="role"
                                value="buyer"
                                checked={formData.role === 'buyer'}
                                onChange={(e) => handleChange('role', e.target.value)}
                            />
                            <span className="ml-2">Buyer</span>
                        </label>
                        <label className={`flex gap-2  ${formData.role === 'seller'? "box-shadow-pink":""}  items-center border pl-3 pr-5 py-[6px] rounded-3xl`}>
                            <input
                                type="radio"
                                className="form-radio"
                                name="role"
                                value="seller"
                                checked={formData.role === 'seller'}
                                onChange={(e) => handleChange('role', e.target.value)}
                            />
                            <span className="ml-2">Seller</span>
                        </label>
                    </div>
                </div>

                {['firstName', 'lastName', 'phone', 'email', 'password'].map((field, index) => (
                    <div className="mb-10" key={index}>
                        <InputCompAuth
                            label={labels[index]}
                            value={formData[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                            error={errors[field]}
                            type={field.includes('password') ? 'password' : field.includes('phone') ? 'phone' : 'text'}
                        />
                    </div>
                ))}
                <div className="mt-6 md:mt-6 mb-3">
                    <PrimaryButton
                        text="Sign Up"
                        btnClass="h-12 w-full rounded-lg"
                        loading={isLoading}
                        onClick={signupHandler}
                    />
                    <div className="py-2 flex justify-center">Already have an Account? <Link to='/login' className="ml-1 hover:underline">Login</Link></div>
                </div>
            </div>
        </div>
    );
};
