import CoinCard from "@/components/coincard";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import axios from "axios";
import Logout from "../../../components/logout";
import Hero from "@/components/hero";
// import Loader from "@/components/loading";
import outPrices from "../../../libs/prices";
import HomePage from "./HomePageComponent";

async function AssetPage() {
  const Userresponce = await getServerSession(authOptions);
  await dbConnect();
  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  }).exec();

  return <HomePage userInfoString={JSON.stringify(userInfo)} />
}

export default AssetPage;
