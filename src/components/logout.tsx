"use client";
import { signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { RiMenu2Fill } from "react-icons/ri";
import { FiAirplay } from "react-icons/fi";

export default function Logout() {
  const notify = () => toast("Logged Out");

  function LogOutAndNotify() {
    notify();
    signOut();
  }
  return (
    <>
      <div className="flex justify-between pt-5 bg-gray-950 w-full">
        <button>
        
        </button>

        <div className="text-xl text-white flex">
          {" "}
          <FiAirplay className="mt-1" /> <div className="ml-2">Qfs Asset Vault Ledger</div>
        </div>
        <button
          className="p-1 rounded text-xs text-white bg-gray-600"
          onClick={() => LogOutAndNotify()}
        >
          Log out
        </button>
      </div>

      <ToastContainer />
    </>
  );
}
