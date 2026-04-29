'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getWallet } from './wallets';
import QRCode from "react-qr-code";




export default function DepositForm({ props, user, userid, network }: any) {
    const router = useRouter()
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const notify = () => toast("Stand by for confirmation")


    function getAmount(event: any) {
        setAmount(event.target.value)
    }

    const transaction = {
        coin: props,
        amount: amount,
        direction: 'in',
        user: user,
        userid: userid
    }

    const wallet = getWallet(props, network)

    async function handleSubmit() {
        setIsloading(true)
        try {
            await axios.post(`/main/api`, transaction);
            notify()
            setTimeout(() => {
                router.push("/main/assetpage")
            }, 5000);

        } catch (err) {
            toast('An Error Occored Try again', { type: 'error' })
            setIsloading(false)
        }
    }
    return <>
        <div className="text-xl font-bold text-center mt-5 px-2 md:block hidden">
            {wallet.big}
        </div>

        <div className="text-xl font-bold text-center mt-5 px-2 md:hidden">
            {wallet.small}
        </div>

        <div style={{ height: "auto", margin: "0 auto", maxWidth: 260, width: "100%", paddingTop: 20 }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={wallet.big}
                viewBox={`0 0 256 256`}
            />
        </div>

        <div className="w-4/5 h-10 mx-auto mt-5">
            <input type="number" placeholder="Enter Amount" className="w-full h-full border-0 shadow shadow-gray-800 rounded active:border px-2" onChange={getAmount} />
        </div>


        <div className="mt-5 text-gray-800 text-center">
            Send {props} to the above address and the button below
        </div>


        <div className="md:w-2/6 w-1/2 mx-auto mt-5">
            <button disabled={isLoading} onClick={handleSubmit} className="w-full py-4 bg-gray-800 text-white rounded">
                Have Made Payment
            </button>
        </div>

        <ToastContainer />
    </>
}