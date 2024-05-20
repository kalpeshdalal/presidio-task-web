import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) =>{
    const [userData, setUserData] = useState(null);

    const setUser = ({body}) => {
        setUserData({name:"kalpesh"})
    }
    const updateUser = ({body}) => {
        
    }
    const removeUser = (params) => {
        setUserData(null)
    }
    return (
        <UserContext.Provider value={{ userData:userData,setUser,updateUser,removeUser}}>
          {children}
        </UserContext.Provider>
      );
}