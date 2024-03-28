import React, { useState } from "react";
import authService from "../Appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { authlogin } from "../Store/AuthSlice";
import { Button, Input } from './index'
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form'
import { useToast } from "@chakra-ui/react";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const toast = useToast();

    const create = async (data) => {
        setError(false)
        try {
            
            toast({
                title: "Creating account...",
                status: "info",
                position: 'top',
                duration: 1000,
                isClosable: true,
            });

            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authlogin({userData}))

                // Show success toast and navigate to home page
                toast({
                    position: 'top',
                    title: "Account created.",
                    description: "You can now post blogs.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            setError("Invalid Credentials. Please check the email and password & Net.")
            toast({
                title: "Error",
                position: 'top',
                description: "A user with the same username or email already exists. Please check your network connection.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <div className="loginsignbox2" > 
            <form onSubmit={handleSubmit(create)} className="formlogin">
            <p className="login">Sign-up On The Blog</p>
            {error && <p className="text-red-600 mt-2 mr-9">{error}</p>}
            <div className="inputContainer">
                <Input
                    className={'mt-2  bg-black'}
                    placeholder="Enter Your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    className={'mt-3 bg-black  '}
                    placeholder="Enter Your Email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                setError("Email Address Must Be a Valid Address"),
                        }
                    })}
                />
                <Input
                    className={'mt-3 bg-black'}
                    type="password"
                    placeholder="Enter Your password"
                    {...register("password", {
                        required: true,
                        validate: value => {
                            if (value.length < 8) {
                                setError("Password must be at least 8 characters long")
                                return false;
                            }
                            return true;
                        }
                    })}
                />
            </div>
            <button className="forget">Create Account</button>
            <div className="con">
                <p>Already a User?&nbsp;</p>
                <Link to='/login'>Log-in</Link>
            </div>
        </form>
        </div>
    )
}
export default Signup;
