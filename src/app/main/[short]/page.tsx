import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import User from "@/model/user";
import axios from "axios";
import { RiLuggageDepositLine } from "react-icons/ri";
import { BiChevronLeft, BiMoneyWithdraw } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
import BigIcon from "./bigicon";
import { GrGrow } from "react-icons/gr";
import outPrices from "@/libs/prices";
import history from "@/model/history";
import { IoIosSend } from "react-icons/io";
import { CiWallet } from "react-icons/ci";

export default async function Short({ params, searchParams }: any) {
  const short = (await params).short
  const search = await searchParams
  const Userresponce = (await getServerSession(authOptions)) as any;
  await dbConnect();
  let price: any = 0;
  try {
    const response = await axios.get(`https://api.coinconvert.net/convert/${short}/usd?amount=1`);
    const keys = Object.keys(response.data);
    const usdKey = keys.find(key => key !== 'status' && key !== short);
    price = usdKey ? response.data[usdKey] : 0;
  } catch (err: any) {
    console.log(`Error fetching price for ${short}:`, err);
    price = 0;
  }

  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  });
  const dbhistories = await history.find({
    user: Userresponce?.user?.id,
  });
  let histories: any[] = [];

  dbhistories.map((res) => {
    if (res.coin === short) {
      histories.push(res);
    }
  });
  console.log(userInfo.balance['USDTerc20'], `${short}${search['network']}`)

  return (
    <div className="bg-cyan-100 w-full h-full">
      <div className="flex-col justify-center items-center pb-32">
        <div className="h-32 w-full">
          <Link className="text-gray-700 flex pt-4 pl-2" href={"/main/assetpage"}>
            <BiChevronLeft />{" "}
            <div className="text-xs text-gray-700">
              {short}

              <div className="text-gray-700">$ {(Math.round((price + Number.EPSILON) * 100) / 100).toLocaleString()}</div>
            </div>
          </Link>
        </div>
        <div className="w-full">
          <div className="text-center text-white">
            <div className="w-20 h-20 mx-auto  rounded-full flex justify-center items-center">
              <Image
                src={`/${short.toLocaleLowerCase()}.png`}
                alt={`${short} Icon`}
                width={90}
                height={90}
                className="rounded-full"
              />
            </div>

            {short.includes("USDT") ? <div className="mt-1 text-gray-700">{userInfo.balance[`${short}${search['network']}`]}{" "} {short}({search['network']})  </div> : <div className="mt-1 text-gray-700">{userInfo.balance[`${short}`]}{" "} {short}({search['network']})  </div>

            }



            <div className="mt-1 text-gray-700">
              $
              {short.includes('USDT') ?
                (Math.floor(
                  (price * userInfo.balance[`${short}${search['network']}`] + Number.EPSILON) *
                  100
                ) / 100).toLocaleString() :
                (Math.floor(
                  (price * userInfo.balance[`${short}`] + Number.EPSILON) *
                  100
                ) / 100).toLocaleString()
              }
            </div>
          </div>
          <div className="md:w-1/4 w-4/5 mx-auto flex justify-between mt-5">
            <Link
              href={`${short}/withdraw `}
              className="text-white cursor-pointer"
            >
              <div className="md:w-10 md:h-10 w-8 h-8 mx-auto rounded-xl  flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-500">
                <IoIosSend className="text-[12px] md:text-base" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-center">
                Send {short}
              </p>
            </Link>
            <Link
              href={`${short}/deposit?network=${search['network']}`}
              className="text-white cursor-pointer"
            >
              <div className="md:w-10 md:h-10 w-8 h-8 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-md shadow-blue-500 flex items-center justify-center">

                <BiMoneyWithdraw className="text-[12px] md:text-base" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-center">
                Recieve {short}
              </p>
            </Link>
            <a
              href={"https://www.moonpay.com/"}
              className="text-white cursor-pointer"
            >
              <div className="md:w-10 md:h-10 w-8 h-8 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-md shadow-blue-500 flex items-center justify-center">

                <BsMoonStars className="text-[12px] md:text-base" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-center">Buy</p>
            </a>

            <Link
              href={`/main/connect-wallet`}
              className="text-white cursor-pointer"
            >
              <div className="md:w-10 md:h-10 w-8 h-8 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-green-600 shadow-md shadow-blue-500 flex items-center justify-center">

                <CiWallet className="text-[12px] md:text-base text-white" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-center">
                Connect Wallet
              </p>
            </Link>
          </div>
        </div>
      </div>

      {histories.length > 0 ? (
        <>
          <div className="pt-4 text-center font-thin md:text-4xl text-2xl">
            Transaction Histroy
          </div>

          <div className="flex justify-center md:w-2/3 w-full mt-5 mx-auto px-2 overflow-x-auto">
            <table className="min-w-full text-sm text-gray-400 rounded">
              <thead className="bg-gray-800 text-xs uppercase font-medium">
                <tr>
                  <th></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {histories.map((res, index) => {
                  return (
                    <tr
                      className={`${res.direction === "in" ? "bg-green-800" : "bg-red-800"
                        }`}
                      key={index}
                    >
                      <td className="pl-4">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {res.coin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {res.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(res.createdOn).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <BigIcon className="mx-auto mt-4" />
      )}
    </div>
  );
}
