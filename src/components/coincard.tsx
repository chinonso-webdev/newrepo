"use client";

import Link from "next/link";
import Image from "next/image";
// import Loader from "@/components/loading";

declare interface Coin {
  name: String;
  short: any;
  network: any;
  price: number;
  changePercent: Number;
  amount: any;
  priceAmount: number;
  image: any;
}

export default function CoinCard({ props }: { props: Coin }) {
  return (
    <Link href={`${props.short}?network=${props.network}`}>
      <div className="flex justify-between w-full">
        <div className="grid grid-cols-3 gap-1">
          <div className="md:w-10 md:h-10 w-5 h-5 relative">

            <Image
              src={props.image}
              alt={"coin logo"}
              className="rounded-full"
              fill
            />
          </div>

          <div className="text-sm text-gray-400 col-span-2 md:mt-3">

            <div className={props.name.includes("USDT") ? "md:ml-0 -ml-3 " : props.name.includes("TRON") ? "ml-2 md:ml-0" : ""}>
              <div className="">{props.name}</div>
              ${(Math.floor((props.price + Number.EPSILON) * 100) / 100).toLocaleString()}
            </div>

          </div>

        </div>
        <div className="text-sm text-gray-400">
          <div className="">
            {props.amount} {props.short}
            {/* ({props.network}) */}
          </div>

          <div className="">
            ${(Math.round((props.priceAmount + Number.EPSILON) * 100) / 100).toLocaleString()}
          </div>
        </div>
      </div>

    </Link >
  );
}
