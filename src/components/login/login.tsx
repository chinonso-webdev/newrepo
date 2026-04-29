'use client'
import React, { useState } from 'react';
import './login.css'
import Link from 'next/link';
import { CiLock, CiLogin, CiUser } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const notify = (message: string) => toast(message);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        const email = e.target.email.value?.trim();
        const password = e.target.password.value;

        // Validation
        if (!email || !password) {
            notify("Please enter email and password");
            setLoading(false);
            return;
        }

        try {
            notify("Logging you in...");
            
            const result = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false, // Don't auto-redirect, we'll handle it
            });

            if (result?.error) {
                if (result.error === "CredentialsSignin") {
                    notify("Invalid email or password. Please try again.");
                } else {
                    notify("Login failed: " + result.error);
                }
                setLoading(false);
                return;
            }

            if (result?.ok) {
                notify("Welcome Back!");
                // Use absolute URL to prevent localhost redirect
                const redirectUrl = `/main/assetpage`;
                router.push(redirectUrl);
                // Give time for redirect
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } else {
                notify("Login failed. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            notify("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <div className="login__field">
                            <CiUser className="login__icon" />
                            <input type="email" className="login__input" placeholder="User name / Email" name="email" required />
                        </div>
                        <div className="login__field">
                            <CiLock className="login__icon" />
                            <input type="password" className="login__input" placeholder="Password" name="password" required />
                        </div>
                        <button className="button login__submit" disabled={loading}>
                            <span className="button__text">{loading ? "Logging in..." : "Log In Now"}</span>
                            <CiLogin className='button__icon ' />

                        </button>
                    </form>
                    <div className="social-login">
                        <h3><Link href={'/register'}>Sign Up</Link></h3>
                        <h3><Link href={'/'}>GO Home</Link></h3>
                        <div className="social-icons">
                            <a href="#" className="social-login__icon fab fa-instagram"></a>
                            <a href="#" className="social-login__icon fab fa-facebook"></a>
                            <a href="#" className="social-login__icon fab fa-twitter"></a>
                        </div>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;