"use client";

import { useState } from "react";
import { getDetials } from "../coins";
import CustomSelect from "./options";

export default function CardHolder({
  header,
  prices,
  select,
  setAmount,
  amount,
}: any) {
  const [short, setShort] = useState("");
  const [coinAmount, setCoinAmount] = useState(0);
  const [price, setPrice] = useState(0);

  function handleShortChange(selectedShort: string) {
    setShort(selectedShort);
  }
  function handleAmountChange(selectedAmount: number) {
    setCoinAmount(selectedAmount);
  }
  function handlePriceChange(selectedPrice: number) {
    setPrice(selectedPrice);
  }
  function HandleChange(e: { target: { value: any } }) {
    setAmount(e.target.value);
  }

  return (
    <div className="rounded-lg p-4 md:w-1/2 w-full mx-auto border">
      <div className="flex items-center justify-between">
        <div className="">
          <div className="text-gray-400 md:text-sm text-xs pb-5 capitalize">
            {header} :
          </div>

          <CustomSelect
            coinsThem={prices}
            select={select}
            handleShortChange={handleShortChange}
            handlePriceChange={handlePriceChange}
            handleAmountChange={handleAmountChange}
          />

          <div className="text-gray-400 md:text-sm text-xs mt-5 h-full">
            {coinAmount} <span className="text-xs">{short} available</span>
          </div>
        </div>
        <div className="text-gray-400 md:text-sm text-xs mt-4 h-full w-full">
          <input
            max={coinAmount}
            min={0}
            value={amount}
            type="number"
            onChange={HandleChange}
            disabled={short === ""}
            readOnly={header === "to"}
            className="md:text-sm text-xs py-4 border-none bg-transparent w-full  text-gray-600 focus:outline-none"
            placeholder="Amount"
          />
        </div>
      </div>
    </div>
  );
}
