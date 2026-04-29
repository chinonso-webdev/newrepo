import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { TbCashOff } from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa"
import user from "@/model/user";
import deposit from "@/model/history"
import dbConnect from "@/libs/dbConnect";

export default async function AdminMain() {
    await dbConnect()
    const UserCount = await user.countDocuments({ role: 'user' }).exec()
    const DepositCount = await user.countDocuments({
        confirmed: 'confirmed'
    }).exec()

    const deposits = await deposit.find({
        confirmed: 'confirmed',
        direction: 'in'
    }).exec()

    const Withdrawals = await deposit.find({
        confirmed: 'confirmed',
        direction: 'out'
    }).exec()

    const depositsAmount = deposits.reduce((acc, coins) => acc + coins.amount, 0)
    const WithdrawalsAmount = deposits.reduce((acc, coins) => acc + coins.amount, 0)
    return <>
        <div className="grid md:grid-cols-4 md:gap-5 gap-2 grid-cols-2">
            <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-950 rounded  flex flex-col justify-center items-center text-white">
                <p className="">
                    Total users
                </p>
                <AiOutlineUsergroupAdd className="text-2xl mt-2" />
                <p className="mt-1 text-xs md:text-xl">
                    {UserCount}
                </p>
            </div>

            <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-950 rounded  flex flex-col justify-center items-center text-white">
                <p className="">
                    Total Dopsits Amount
                </p>
                <BsCashStack className="text-2xl mt-2" />
                <p className="mt-1 text-xs md:text-xl">

                    {DepositCount}
                </p>
            </div>

            <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-950 rounded  flex flex-col justify-center items-center text-white">
                <p className="">
                    Total Transactions
                </p>
                <FaCashRegister className="text-2xl mt-2" />
                <p className="mt-1 text-xs md:text-xl">
                    {depositsAmount} coins
                </p>
            </div>

            <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-950 rounded  flex flex-col justify-center items-center text-white">
                <p className="">
                    Total Withdrawals
                </p>
                <TbCashOff className="text-2xl mt-2" />
                <p className="mt-1 text-xs md:text-xl">
                    {WithdrawalsAmount} coins
                </p>
            </div>
        </div>
    </>
}