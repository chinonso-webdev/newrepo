"use client";

import axios from "axios";
import StateHolder from "./stakeholder";
import { useEffect, useState } from "react";

interface StateInterface {
  name: String;
  _id: String;
  coin: String;
  amount: number;
  rate: number;
  duration: number;
}
export default function MainHolder() {
  const [stakes, setStakes] = useState<StateInterface[]>([]);
  const createStake = async (e: any) => {
    e.preventDefault();
    const formData = {
      name: e.target["stake"].value,
      amount: e.target["amount"].value,
      rate: e.target["rate"].value,
      duration: e.target["duration"].value,
    };
    const data = await axios.post("/admin/stake/api", formData);
    setStakes([...stakes, data.data]);
  };

  const updateList = (id: string) => {
    const list = stakes;
    const removeIndex = list.findIndex((res) => res._id == id);

    list.splice(removeIndex, 1);
    console.log(list);
    setStakes([...stakes.concat(list)]);
  };

  useEffect(() => {
    const getStakes = async () => {
      const data = await axios.get("/admin/stake/api");
      setStakes(data.data);
    };
    getStakes();
  }, []);

  useEffect(() => {
    console.log(stakes);
  }, [stakes]);
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {stakes.map((res, index) => (
        <div key={index}>
          <StateHolder stake={res} updateList={updateList} />
        </div>
      ))}

      <form className="w-full rounded-xl shadow pb-5" onSubmit={createStake}>
        <div className="h-10 bg-blue-700 flex justify-around items-center rounded-t-xl text-gray-100 px-2">
          Stake Name
          <input className="rounded w-1/2 text-black px-1" name="stake" />
        </div>
        <div className="mt-10 px-5 text-gray-800 text-xl">
          <div className="flex justify-between mt-5">
            <span>rate : </span>
            <input
              className="rounded w-1/2 bg-gray-200 px-1"
              type="number"
              name="rate"
            />
          </div>
          <div className="flex justify-between mt-5">
            <span>amount : </span>

            <input
              className="rounded w-1/2 bg-gray-200 px-1"
              type="number"
              name="amount"
            />
          </div>
          <div className="flex justify-between mt-5">
            <span>duration : </span>

            <input
              className="rounded w-1/2 bg-gray-200 px-1"
              type="number"
              name="duration"
            />
          </div>

          <div className="flex justify-center w-full mt-4">
            <button
              type="submit"
              className="w-10/12 py-2 text-white bg-blue-700 rounded-lg active:bg-blue-900 hover:bg-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
