"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

export default function LoginComponent() {
  const notify = (message: string) => toast(message);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      notify("Logging you in");
      const logindata = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/main/assetpage",
      });
      notify("Welcome Back");
    } catch (error) {
      notify("An Error occured try again letter");
    }
  };
  return (
    <>
      <div className="h-screen md:grid md:grid-cols-2">
        <div className="relative overflow-hidden md:flex w-full bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
          <div className="py-10 md:py-0">
            <h1 className="text-white font-bold text-4xl font-sans text-center md:text-left">
              QFS Asset Ledger
            </h1>
            <p className="text-white mt-1 text-center md:text-left">
              The Gateway to The Blockchain
            </p>
            <Link href={"/"}>
              <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 mx-auto md:mx-0">
                Read More
              </button>
            </Link>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 hidden md:block"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 hidden md:block"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 "></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        <div className="mx-auto md:w-1/2 justify-center py-10 items-center bg-white px-2 md:px-0">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center md:text-left">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7 text-center md:text-left">
              Welcome Back
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                id=""
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <Link
              className="md:text-sm text-xs ml-2 hover:text-blue-500 cursor-pointer"
              href={""}
            >
              Forgot Password ?
            </Link>
            <br />
            <Link href={"register"} className="md:text-sm text-xs ml-2">
              No Account Yet ? <span className="text-blue-700">Register</span>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
