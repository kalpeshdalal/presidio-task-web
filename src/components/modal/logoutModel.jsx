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
        <div className={`relative `}>
            <div className=' absolute left-[-200px] bg-white shadow-md border border-[#c2c2c211]  px-5 py-[10px] rounded-xl w-[250px] flex flex-col items-center gap-4 !z-10'>
               
                <div className='text-sm  text-center mt-2'>Are you sure you want to log out ?</div>
                <div className='flex gap-3 justify-center items-center '>
                    <div>
                        <button onClick={onClose} className=" mr-2 mt-[-30px] px-2 text-sm py-1 rounded-full border  border-[#676767]">Cancel</button>
                    </div>
                    <div>
                        <button onClick={()=>userLogout()} className="  mr-2  mt-[-30px] px-2 text-sm py-1 rounded-full border text-white bg-[#662671]">Confirm</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LogoutModel;
