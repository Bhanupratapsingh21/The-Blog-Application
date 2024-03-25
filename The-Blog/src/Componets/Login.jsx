import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../Store/AuthSlice'
import { Button, Input } from './index'
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'

function Login() {
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error ,setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const login = async (data) => {
        setLoading(true)
        setError(false)
        toast({
            title: "Logging Into Your Acc",
            status: "info",
            position: 'top',
            duration: 1000,
            isClosable: true,
        });
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData));
                    toast({
                        position: 'top',
                        title: "Login successfully.",
                        description: "You can now log in.",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                    });
                    navigate("/")
                }
            }
        } catch (error) {
            setError("Invalid Credentials. Please check the email and password & Net.")
            toast({
                title: "Login Failed",
                position: 'top',
                description: "Invalid Credentials. Please check the email and password & Net.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false)
        }
    }

    const handleLoginSubmit = async (data) => {
        await login(data);
    }

    return (
        <div className="loginsignbox2"> 
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="formlogin">
            <p className="login mb-5">Log in to The-Blog</p>
            {error && <p className="text-red-600 mt-2 mr-9">{error}</p>}
            <div className="inputContainer">
                <Input
                    labal={'Enter Your Email'}
                    className={'mb-3 bg-black  '}
                    placeholder="Enter Your Email"
                    type="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email Address Must Be a Valid Address",
                        },
                    })}
                />
                <Input
                    className={'mt- bg-black'}
                    type="password"
                    labal={'Enter Your Password'}
                    placeholder="Enter Your password"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                />
            </div>
            <button className="forget" disabled={loading}>
                {loading ? "Logging in..." : "Log-In"}
            </button>
            <div className="con">
                <p>don't have account?&nbsp;</p>
                <Link to='/signup'> sign in</Link>
            </div>
        </form>
        </div>
    )
}

export default Login
