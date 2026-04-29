import { authOptions } from "@/libs/auth";
import dbConnect from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import PlanHolder from "./planholder";
import User from "@/model/user";
import stake from "@/model/stake";

interface StateInterface {
  name: String;
  _id: String;
  coin: String;
  amount: number;
  rate: number;
  duration: number;
}

export default async function StakeCoin({
  params,
}: {
  params: Promise<{ short: string }>
}) {
  const short = (await params).short
  const Userresponce = await getServerSession(authOptions);
  await dbConnect();
  let price = 0;
  const userInfo = await User.findOne({
    email: Userresponce?.user?.email,
  }).exec();
  const stakes = await stake.find<StateInterface[]>({});
  return (
    <>
      <div className="h-10 w-full bg-gray-950"></div>

      <div className="mt-10">
        <div className="w-32 h-32 rounded-full bg-gray-100 shadow flex justify-center items-center mx-auto">
          {parseFloat(userInfo.balance[short].toFixed(10))}{" "}
          {short}
        </div>

        <div className="text-center font-thin text-3xl mt-5">Select Plan</div>

        <div className="grid md:grid-cols-3 md:px-4 px-2 mt-5 gap-5">
          {stakes.map((res, index) => (
            <div key={index}>
              <PlanHolder
                dataString={JSON.stringify(res)}
                balance={userInfo.balance[short]}
                short={short}
                Userresponce={Userresponce}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
