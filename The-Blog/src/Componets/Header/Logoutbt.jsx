import React from "react";
import { useDispatch } from 'react-redux'
import authService from "../../Appwrite/auth";
import { logout } from "../../Store/AuthSlice";

function Logoutbt (){
    const dispatch = useDispatch()
    const handlelogout = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button 
        onClick={handlelogout}
        className='inline-bock px-6 py-2 duration-200 hover:bg-gray-700 rounded-full'
        >Logout</button>
    )
}
export default Logoutbt