import Logout from "@/components/logout";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import User from "@/model/user";
import axios from "axios";
import { getDetials, Total } from "../coins";
import Hero from "@/components/hero";
// import Loader from "@/components/loading";
import SwapHolder from "./swapHolder";
import Link from "next/link";
import outPrices from "@/libs/prices";

export default async function SwapPage() {
  const Userresponce = await getServerSession(authOptions);
  await dbConnect();
  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  }).exec();
  let prices = outPrices;

  //   try {
  //     const apiKey = "5B04AC9E-E22C-4666-9036-8CA5D880105A";
  //     const baseUrl = "https://rest.coinapi.io/v1/";
  //     const endpointPath = "assets";
  //     const filter_symbol_id =
  //       "BTC;ETH;XLM;XRP;USDT;BNB;ADA;DOGE;LTC;SHIB;MATIC;FTM;ALGO;PEPE;SOL";
  //     const limit = 10;
  //     const headers = {
  //       "X-CoinAPI-Key": apiKey,
  //     };
  //     const responce = await axios.get(
  //       `${baseUrl}${endpointPath}?filter_asset_id=${filter_symbol_id}&limit=${limit}`,
  //       {
  //         headers,
  //       }
  //     );
  //     prices = responce.data;
  //   } catch (err: any) {
  //     console.log(err);
  //   }

  return (
    <div className="relative w-full min-h-screen">
      <Logout />
      <div className="w-full bg-gray-950 rounded-lg p-5">
        <Link
          className="text-white font-semibold text-xl"
          href="/main/assetpage"
        >
          <div className="">Total Balance</div>
          <div className="pb-5">
            {prices.length > 0 ? (
              Math.round((Total(userInfo, prices) + Number.EPSILON) * 100) / 100
            ) :
              // <Loader size={"30"} speed={"2"} color={"white"} />
              <div
                className="inline-block h-2 w-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
              </div>
            }
          </div>
        </Link>

        <Hero coinsThem={getDetials(userInfo, prices)} />
      </div>
      <div className="flex items-center w-full h-full px-2 mt-10 md:mt-0 pt-10">
        <SwapHolder userInfo={JSON.stringify(userInfo)} prices={prices} />
      </div>
    </div>
  );
}
