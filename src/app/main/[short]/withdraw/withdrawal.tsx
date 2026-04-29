'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function WithdarwalPage({ props, user, userid }: any) {
    const router = useRouter();
    const notify = (message: String) => toast(message)

    const [amount, setAmount] = useState(0);
    const [wallet, setWallet] = useState('');

    function getAmount(event: any) {
        setAmount(event.target.value)
    }

    function getWalletAddress(event: any) {
        setWallet(event?.target.value)
    }

    const transaction = {
        coin: props,
        amount: amount,
        direction: 'out',
        user: user,
        userid: userid,
        wallet: wallet
    }

    async function handleSubmit() {
        notify("Stand by for confirmation")
        setTimeout(() => {
            toast('Transaction failed bypass \n\ncontact at support service to review your withdrawal', { type: 'error' })
        }, 5000);
        // try {
        //     await axios.post(`/main/api`, transaction);
        //     notify("Stand by for confirmation")
        //     setTimeout(() => {
        //         router.push("/main/assetpage")
        //     }, 5000);
        // } catch (err) {
        //     console.log(err)
        // }

    }

    return <>
        <div className="text-center text-sm text-gray-700">
            <span className="font-bold">Send</span> {props}
        </div>

        <div className="mt-10 md:w-2/6 w-4/5 mx-auto">
            <input placeholder="Recipient Address" type="text" className="w-full h-12 shadow-md shadow-gray-400 rounded active:border-0 px-2" onChange={getWalletAddress} />
        </div>


        <div className="mt-10 md:w-2/6 w-4/5 mx-auto">
            <input placeholder="Quantity" type="number" className="w-full h-12 shadow-md shadow-gray-400 rounded active:border-0 px-2" onChange={getAmount} />
        </div>


        <div className="md:w-2/12 w-4/5 mx-auto mt-5">
            <button className="w-full py-4 rounded bg-gray-900 text-white" onClick={handleSubmit}>
                Continue
            </button>
        </div>

        <ToastContainer />
    </>
}