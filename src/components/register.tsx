
'use client'
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
    fullname: string;
    email: string;
    phoneNumber: string;
    country: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    fullname?: string;
    email?: string;
    phoneNumber?: string;
    country?: string;
    password?: string;
    confirmPassword?: string;
}

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        email: "",
        phoneNumber: "",
        country: "",
        password: "",
        confirmPassword: ""
    });
    const router = useRouter()
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full Name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is required.";
        } else if (!/^\+?\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Enter a valid phone number.";
        }

        if (!formData.country) {
            newErrors.country = "Please select a country.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                const newUser = await axios.post('/register/api', formData)
                if (newUser.data.error) {
                    toast.error(newUser.data.error)
                    setIsLoading(false);
                    return
                }
                toast.success("Registration successful! Redirecting to KYC...")
                router.replace(`/kyc/${newUser.data._id}`)
            } catch (error: any) {
                toast.error(error.response?.data?.error || "An error occurred during registration")
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse hidden sm:block"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse hidden sm:block"></div>
            
            <div className="w-full max-w-md relative z-10">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 sm:py-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-blue-100 text-sm">Join us today and start trading</p>
                    </div>

                    {/* Form Content */}
                    <div className="px-6 sm:px-8 py-8 sm:py-10">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.fullname ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.fullname && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.fullname}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.email ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.email}</p>}
                            </div>

                            {/* Phone Number Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 7.491a1 1 0 00.502.756l2.048 1.029a11.042 11.042 0 005.516 5.516l1.029 2.048a1 1 0 00.756.502l7.491 1.498a1 1 0 00.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 123-4567"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.phoneNumber ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.phoneNumber && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.phoneNumber}</p>}
                            </div>

                            {/* Country Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Country</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4h.01" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Select your country"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.country ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.country && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.country}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="At least 6 characters"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.password ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.password}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter your password"
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all focus:outline-none ${errors.confirmPassword ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs font-medium flex items-center mt-1"><span className="inline-block mr-1">⚠</span>{errors.confirmPassword}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        {/* Terms */}
                        <p className="text-xs text-slate-500 text-center mt-6">
                            By creating an account, you agree to our{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom decoration */}
                <p className="text-center text-slate-500 text-xs mt-6">
                    Secure • Fast • Reliable
                </p>
            </div>

            {isMounted && <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />}
        </div>
    );
};

export default RegistrationPage;
