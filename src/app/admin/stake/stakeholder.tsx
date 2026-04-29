"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

interface StateInterface {
  name: String;
  _id: String;
  coin: String;
  amount: number;
  rate: number;
  duration: number;
}

export default function StateHolder({
  stake,
  updateList,
}: {
  stake: StateInterface;
  updateList: any;
}) {
  const deleteStake = async (id: String) => {
    console.log(id);
    try {
      await axios.delete(`/admin/stake/api/?id=${id}`);
      updateList(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full rounded-xl shadow pb-5">
      <div className="h-10 bg-blue-700 flex justify-center items-center rounded-t-xl text-gray-100 px-2">
        <BiEdit type="button" className="mr-auto cursor-pointer" />
        {stake.name}
        <FiDelete
          type="button"
          className="ml-auto cursor-pointer"
          onClick={() => {
            deleteStake(stake._id);
          }}
        />
      </div>
      <div className="mt-10 px-5 text-gray-800 text-xl">
        <div className="flex justify-between">
          <span>coin : </span> <div className="">Any</div>
        </div>
        <div className="flex justify-between mt-5">
          <span>rate : </span> <div className="">{stake.rate}</div>
        </div>
        <div className="flex justify-between mt-5">
          <span>amount : </span> <div className="">{stake.amount}</div>
        </div>
        <div className="flex justify-between mt-5">
          <span>duration : </span> <div className="">{stake.duration}</div>
        </div>
      </div>
    </div>
  );
}
