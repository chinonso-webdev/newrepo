"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface StateInterface {
  name: String;
  _id: String;
  coin: String;
  amount: number;
  rate: number;
  duration: number;
  createdOn: string;
}

export default function PlanHolder({
  dataString,
  balance,
  short,
  Userresponce,
}: {
  dataString: string;
  balance: number;
  short: string;
  Userresponce: any;
}) {
  const [hide, setHide] = useState("opacity-0");
  const [amount, setAmount] = useState(0);
  const [data] = useState<StateInterface>(JSON.parse(dataString));
  const [isDiabled, setDisabled] = useState(false);
  const router = useRouter();

  function handleSelect() {
    if (hide === "opacity-0") {
      setHide("opacity-1");
    } else {
      setHide("opacity-0");
    }
    setDisabled(true);
  }

  function handleSetAmount(e: any) {
    setAmount(e.target.value);
  }

  useEffect(() => {
    function handleDisabled() {
      if (balance) {
        if (amount <= 0 || amount > balance) {
          setDisabled(true);
          return;
        } else {
          setDisabled(false);
          return;
        }
      }
    }
    handleDisabled();
  }, [amount, balance]);

  async function handleStake() {
    const date = new Date(data.createdOn)
    const dateEnd = date.setDate(date.getDate() + data.duration)
    const stake = {
      name: data.name,
      coin: short,
      amount,
      rate: data.rate,
      duration: data.duration,
      user: Userresponce.user.id,
      completedOn: new Date(dateEnd),
    };
    toast("loading");
    try {
      await axios.post(`/main/${short}/stake/api`, stake);
      toast("Success", { type: "success" });
      setTimeout(() => {
        router.replace("/main/assetpage");
      }, 2000);
    } catch (err: any) {
      toast(JSON.stringify(err.message));
    }
  }
  return (
    <div className="w-full rounded-xl shadow pb-4">
      <div className="h-8 flex justify-center items-center text-white font-semibold bg-gradient-to-tr from-gray-700 to-gray-900 rounded-t-xl">
        {data.name}
      </div>
      <div className="text-center flex justify-center mt-5">
        <div className="font-thin text-4xl">{data.rate}%</div>
        <div className="text-xs mt-auto uppercase">yeild</div>
      </div>
      <div className="flex justify-between px-2 text-gray-700 mt-5">
        <div className="">Minimum Amount :</div>
        <div className="">{data.amount}</div>
      </div>
      <div className="flex justify-between px-2 text-gray-800 mt-4">
        <div className="">Duration:</div>
        <div className="">{data.duration} days</div>
      </div>

      <div
        className={`flex transition-all justify-between px-2 text-gray-800 ${hide} mt-4`}
      >
        <div className="">Amount:</div>
        <input
          type="number"
          min={balance}
          className="focus:border-none active:border-none px-2 bg-gray-50 rounded border border-gray-300"
          onChange={handleSetAmount}
        />
      </div>

      <div
        className={`flex transition-all justify-between px-2 text-gray-800 ${hide} mt-4`}
      >
        <div className="">Total Yeiled:</div>
        <div className="">
          {amount * (data.rate / 100)} {short}
        </div>
      </div>

      {hide === "opacity-0" ? (
        <button
          onClick={handleSelect}
          className="mx-auto w-10/12 h-10 rounded-xl flex justify-center items-center bg-gray-800 active:bg-gray-900 disabled:bg-gray-400 text-gray-50 mt-5"
        >
          Select Plan
        </button>
      ) : (
        <button
          disabled={isDiabled}
          onClick={handleStake}
          className="mx-auto w-10/12 h-10 rounded-xl flex justify-center items-center bg-gray-800 active:bg-gray-900 disabled:bg-gray-400 text-gray-50 mt-5"
        >
          Lock In
        </button>
      )}
      <ToastContainer />
    </div>
  );
}
