"use client";
import { useEffect, useState } from "react";
// to swap
// get the dollar value of the current coin (number of coin * value of each coin) = DV
// get the value of coin to swap to , DV/ dollar value of each coin

import CardHolder from "./cardHolder";
import { getDetials } from "../coins";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface optionType {
  name?: string;
  image: string;
  short: string;
  price?: number;
  amount?: number;
  priceAmount?: number;
}

export default function SwapHolder({ userInfo, prices }: any) {
  const [from, setFrom] = useState<optionType>();
  const [to, setTo] = useState<optionType>();
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setFromTo] = useState<number>(0);
  const [isDiabled, setDisabled] = useState(true);

  async function HandleSwap() {
    setDisabled(true);
    toast("Performing Swap", {});
    const swap = {
      email: JSON.parse(userInfo).email,
      from: from?.short,
      to: to?.short,
      fromAmount,
      toAmount,
    };
    try {
      await axios.put("/main/swap/api", swap);
      setTimeout(() => {
        toast("Success", { type: "success" });
      }, 4000);
    } catch (err) {
      setTimeout(() => {
        toast("An error Occured", { type: "error" });
        setDisabled(false);
      }, 3000);
    }
  }

  function handleSetFrom(from: optionType) {
    setFrom(from);
  }

  function handleSetTo(to: optionType) {
    setTo(to);
  }

  useEffect(() => {
    function calculateSwap() {
      let totalFrom = 0;
      let swapValue = 0;
      if (from?.price) {
        totalFrom = fromAmount * from?.price;
      }
      if (to?.price) {
        swapValue = totalFrom / to?.price;
      }
      setFromTo(Number(swapValue.toFixed(5)));
    }
    function handleDisabled() {
      if (from?.amount) {
        if (fromAmount <= 0 || fromAmount > from?.amount) {
          setDisabled(true);
          return;
        } else {
          setDisabled(false);
          return;
        }
      }
      setDisabled(true);
    }

    calculateSwap();
    handleDisabled();
  }, [fromAmount, from?.price, to?.price, from?.amount]);

  return (
    <div className="w-full">
      <CardHolder
        header={"from"}
        prices={getDetials(JSON.parse(userInfo), prices)}
        select={handleSetFrom}
        setAmount={setFromAmount}
        amount={fromAmount}
      />
      <div className="h-10"></div>
      <CardHolder
        header={"to"}
        prices={getDetials(JSON.parse(userInfo), prices)}
        select={handleSetTo}
        setAmount={setFromTo}
        amount={toAmount}
      />

      <div className="hidden md:block h-32"></div>

      <div className="flex justify-center">
        <button
          className="md:w-1/2 w-11/12 mx-auto bg-blue-900 disabled:bg-blue-200 py-4 text-gray-300 rounded-lg absolute bottom-2"
          disabled={isDiabled}
          onClick={HandleSwap}
        >
          {from?.short} {"<=>"} {to?.short}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
