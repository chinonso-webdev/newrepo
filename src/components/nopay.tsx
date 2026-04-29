import { BiSolidErrorAlt } from "react-icons/bi";

export default function NoPay() {
    return <>
        <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
            <div className="bg-gray-700 rounded-md shadow shadow-gray-100 p-10">
                <span className="text-red-800 text-3xl md:text-6xl flex justify-center">
                    <BiSolidErrorAlt />
                </span>
                <div className="text-gray-200 text-xl md:text-2xl mt-5 font-mono">
                    Service Suspended
                </div>
            </div>
        </div>
    </>
}