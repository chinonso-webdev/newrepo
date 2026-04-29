"use client";
import { FaRegCreditCard } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";
import { IoIosSwap } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Hero({ coinsThem }: any) {
  const router = useRouter();
  const handleClick = (message: string) => {
    toast(message);
    setTimeout(() => {
      router.push("/main/assetpage");
    }, 2000);
  };

  return (
    <div className="mt-5 flex justify-between md:justify-around items-center w-full">
      <Link className="text-white" href={"https://www.moonpay.com/"}>
        <div className="md:w-14 md:h-14 h-10 w-10 rounded-md flex justify-center items-center bg-gradient-to-t from-blue-700 to-blue-900">
          <FaRegCreditCard />
        </div>
        <div className="mt-3 text-white font-bold text-center md:text-sm text-xs">
          Buy
        </div>
      </Link>

      <div
        className="text-white cursor-pointer"
        onClick={() => handleClick("Select Token to Send From")}
      >
        <div className="md:w-14 md:h-14 h-10 w-10 rounded-md flex justify-center items-center bg-gradient-to-t from-yellow-700 to-yellow-800">
          <FiSend />
        </div>
        <div className="mt-3 text-white font-bold text-center text-xs md:text-sm">
          Send
        </div>
      </div>

      <div
        className="text-white cursor-pointer"
        onClick={() => handleClick("Select Token to Receive To")}
      >
        <div className="md:w-14 md:h-14 h-10 w-10 rounded-md flex justify-center items-center bg-gradient-to-t from-red-700 to-red-800 mx-auto">
          <MdOutlineCallReceived />
        </div>
        <div className="mt-3 text-white font-bold text-center text-xs md:text-sm">
          Receive{" "}
        </div>
      </div>

      <Link className="text-white" href={"/main/swap"}>
        <div className="md:w-14 md:h-14 h-10 w-10 rounded-md flex justify-center items-center bg-gradient-to-t from-orange-700 to-orange-800">
          <IoIosSwap />
        </div>
        <div className="mt-3 text-white font-bold text-center text-xs md:text-sm">
          Swap
        </div>
      </Link>

      <Link className="text-white" href={"/main/stake"}>
        <div className="md:w-14 md:h-14 h-10 w-10 rounded-md flex justify-center items-center bg-gradient-to-t from-blue-600 to-blue-700 mx-auto">
          <FiLink />
        </div>
        <div className="mt-3 text-white font-bold text-center text-xs md:text-sm">
          Stake
        </div>
      </Link>
      <ToastContainer />
    </div>
  );
}
