/* global console */
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api'; // Ensure this API function is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await loginUser(data);
            if (typeof window !== "undefined") {
                // eslint-disable-next-line no-undef
                localStorage.setItem('token', response.data.token); // Store the token
            }
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            console.error('Error logging in:', error);
            // eslint-disable-next-line no-undef
            alert(error.response?.data.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <FaEnvelope className="p-2 text-gray-500" />
                            <input
                                type="email"
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
                                className={`flex-1 p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <FaLock className="p-2 text-gray-500" />
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className={`flex-1 p-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-2 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;