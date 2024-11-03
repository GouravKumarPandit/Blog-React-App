import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [error, setError] = useState("");

    // Login functionality
    const login = async (data) => {
        // data is complete form data, it is a object sent by register.
        setError("");
        try {
            const session = await authService.login(data); // This will return a session.

            // Is session is present which means user is logged in successfully 
            if(session){ 
                // We are fetching logged in user data so that we can update the STORE.
                const userData = await authService.getCurrentUser();

                // Here we are updating the Store. Login = true and setting the userData
                if(userData) dispatch(authLogin(userData))

                navigate('/'); // If user is logged in. We are forcefully navigating
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full my-10'>
            <div className={`mx-auto w-full shadow-lg max-w-lg bg-blue-100 opacity-75 rounded-xl p-10 border border-blue-100`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* We are passing login(Our own handle submit function) in handleSubmit() given by react-hook-form, internally it will send the data to login() */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email*" // This will come as a PROPS
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email?.type === 'required' && <span role="alert" className='text-red-950'>Email is required</span>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password*"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors.password?.type === 'required' && <span role="alert" className='text-red-950'>Password is required</span>}

                        <Button
                            type="submit"
                            className="w-full text-white bg-teal-600 hover:bg-teal-700"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login