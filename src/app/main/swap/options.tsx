"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface optionType {
  name?: string;
  image: string;
  short: string;
  price?: number;
  amount?: number;
  priceAmount?: number;
}
export default function CustomSelect({
  coinsThem,
  select,
  handleShortChange,
  handlePriceChange,
  handleAmountChange,
}: {
  coinsThem: optionType[];
  select : Function
  handleShortChange: Function;
  handlePriceChange: Function;
  handleAmountChange: Function;
}) {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);

  const options: optionType[] = coinsThem;

  const handleOptionClick = (option: optionType) => {
    setSelectedOption(option.short);
    select(option)
    setIsOpen(false);
  };

  function showSelectedOption(params: any) {
    const index = options.findIndex((option) => option.short === params);
    handlePriceChange(options[index].priceAmount);
    handleAmountChange(options[index].amount);
    handleShortChange(options[index].short);
    return (
      <div className=" md:text-sm text-xs h-full flex justify-around items-center w-full p-1">
        <div className="h-4 w-4 rounded-full text-gray-400">
          <Image
            src={options[index].image}
            alt={options[index].short}
            width={16}
            height={16}
          />
        </div>

        <div className="md:text-sm text-xs text-gray-400">
          {options[index].short}
        </div>

        <div className="">
          <IoChevronDownOutline className="text-xs text-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block w-64">
      <div
        className="rounded-full w-32 h-8 bg-gray-100 flex justify-around items-center cursor-pointer shadow mt-1 font-bold select-none text-xs text-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption !== "Select an option"
          ? showSelectedOption(selectedOption)
          : "Select an option"}
      </div>
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded shadow-lg mt-2 w-full">
          {options.map((option) => (
            <div
              key={option.short}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              <div className="w-4 h-4 mr-3">
                <Image
                  src={option.image}
                  alt={option.short}
                  width={16}
                  height={16}
                />
              </div>

              <span className="text-gray-700 md:text-sm text-xs">
                {option.short}
              </span>

              <span className="text-gray-700 md:text-sm text-xs ml-auto">
                {option.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
