import React from 'react';
import { IoIosWarning } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authenticationReducer';
import { useNavigate } from 'react-router-dom';
const LogoutModel = ({ onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const userLogout = () => {
		dispatch(logout());
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
        navigate('/login')
	};
    return (
        <div className={`fixed inset-0 bg-white bg-opacity-25 flex items-center justify-center z-50`}>
            <div className='bg-white shadow-md border border-[#c2c2c211] w-[350px] px-5 py-[10px] rounded-xl lg:w-[500px] flex flex-col items-center gap-4'>
                <div className='flex gap-2 justify-center items-center m-2'>
                    <div className='flex items-center justify-center'>
                        <IoIosWarning className='text-red-500 text-4xl' />
                    </div>
                    <div className='md:text-2xl text-xl font-bold'>
                        Log Out
                    </div>
                </div>
                <div className=''>Are you sure you want to log out ?</div>
                <div className='flex gap-3 justify-center items-center my-4'>
                    <div>
                        <button onClick={onClose} className=" mr-2 mt-2 px-6 py-1 rounded-full  text-lg border  border-[#676767]">Cancel</button>
                    </div>
                    <div>
                        <button onClick={()=>userLogout()} className="  mr-2 mt-2 px-6 py-1 rounded-full  text-lg border text-white bg-[#662671]">Confirm</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LogoutModel;
