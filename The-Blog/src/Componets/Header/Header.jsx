import React from "react";
import { Container, Logoutbt } from '../index'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import authService from "../../Appwrite/auth";
import { logout } from "../../Store/AuthSlice";
import BrandingBox from "./Brandingbox"
function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleuser = () => {
        if (authStatus) {
            navigate('/userdetails')
        } else {
            navigate('/signup')
        }
    }

    const handleloginlogout = () => {
        if (authStatus) {
            
            authService.logout().then(() => {
                navigate('/login')
                dispatch(logout())
            })
        } else {
            navigate('/login')
        }
    }

    return (
        <header className='py-3 text-cyan-50 shadow bg-black'>
            <div className="button-container">
                <button className="button">
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" strokeWidth="0" fill="currentColor" stroke="currentColor" className="icon">
                            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                        </svg>
                    </Link>
                </button>
                <button className="button">
                    <Link to={authStatus ? "/add-post" : '/login'} >
                        <svg id="Layer_1" height="1.3em" fill="#ffffff" viewBox="0 0 24 24" width="1.3em" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm1-11h4v2h-4v4h-2v-4h-4v-2h4v-4h2z" /></svg>
                    </Link>
                </button>
                <Link to={authStatus ? "/all-posts" : '/login'} >
                        <h2>The Blog</h2>
                </Link>
                <button onClick={handleuser} className="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" id="Outline" viewBox="0 0 24 24" width="1em" height="1.2em"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" /><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" /></svg>
                </button>
                <button onClick={handleloginlogout} className="button">
                    {authStatus ?
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="1em" fill="#ffffff" height="1em"><path d="M23.117,9.879l-4.95-4.95L16.046,7.05,19.5,10.5H6.617v3H19.5l-3.45,3.45,2.121,2.121,4.95-4.95A3,3,0,0,0,23.117,9.879Z" /><path d="M9.994,20.5a.5.5,0,0,1-.5.5H3.506a.5.5,0,0,1-.5-.5V3.531a.5.5,0,0,1,.5-.5H9.494a.5.5,0,0,1,.5.5V8.345h3V3.531a3.505,3.505,0,0,0-3.5-3.5H3.506a3.505,3.505,0,0,0-3.5,3.5V20.5a3.5,3.5,0,0,0,3.5,3.5H9.494a3.5,3.5,0,0,0,3.5-3.5V15.683h-3Z" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" id="Layer_1" data-name="Layer 1" height='1em' viewBox="0 0 24 24">
                            <path d="m24,12c0,.829-.671,1.5-1.5,1.5h-11.853l1.921,1.946c.582.59.575,1.54-.014,2.122-.292.288-.673.432-1.054.432-.387,0-.774-.149-1.068-.446l-3.743-3.793c-.967-.968-.967-2.554.007-3.528l3.735-3.786c.582-.591,1.532-.595,2.122-.014.589.582.596,1.532.014,2.122l-1.921,1.946h11.853c.829,0,1.5.671,1.5,1.5Zm-2.268,4.223c-.705-.433-1.629-.214-2.064.491-1.653,2.684-4.52,4.287-7.668,4.287-4.962,0-9-4.038-9-9S7.038,3,12,3c3.148,0,6.015,1.603,7.668,4.287.435.706,1.359.925,2.064.491.706-.435.925-1.359.491-2.064C20.019,2.136,16.197,0,12,0,5.383,0,0,5.383,0,12s5.383,12,12,12c4.197,0,8.019-2.136,10.223-5.713.434-.705.215-1.629-.491-2.064Z" />
                        </svg>
                    }
                </button>
            </div>
            
        </header>
    )
}

export default Header