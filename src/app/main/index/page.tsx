import CoinCard from "@/components/coincard";
import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import Home from "./home";
import history from "@/model/history";


async function AssetPage() {
  const Userresponce = await getServerSession(authOptions) as any;
  await dbConnect();
  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  }).exec();

  const dbhistories = await history.find({
    user: Userresponce?.user?.id,
  });





  return <Home userInfoString={JSON.stringify(userInfo)} historiesString={JSON.stringify(dbhistories)} />
}

export default AssetPage;
