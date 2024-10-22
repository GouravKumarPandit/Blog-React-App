import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authSignup} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        setError("");
        try {
            // Creating an account which will also call login(), which will return session. After getting session we will get the current user data and will store it in STORE. 
            const session = await authService.createAccount(data);

            // Is session is present which means user is logged in successfully 
            if(session){ 
                // We are fetching logged in user data so that we can update the STORE.
                const userData = await authService.getCurrentUser();

                // Here we are updating the Store. Login = true and setting the userData
                if(userData) dispatch(authSignup(userData))

                navigate('/'); // If user is logged in. We are forcefully navigating
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name?.type === 'required' && <p role="alert">Full name is required</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email?.type === 'required' && <p role="alert">Email is required</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,})}
                        />
                        {errors.password?.type === 'required' && <p role="alert">Password is required</p>}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup