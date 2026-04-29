import { BiSolidDashboard, BiWallet } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { SiGeneralelectric } from "react-icons/si";
import { MdPending } from "react-icons/md";
import Link from "next/link";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Logout from "@/components/logout";
import { FaLandMineOn } from "react-icons/fa6";

export default async function AdminLayout({ children }: any) {
  const responce = await getServerSession(authOptions)
  if (responce?.user?.name !== 'admin') {
      redirect('/main/assetpage')
  }
  return (
    <>
      <div className="md:h-screen md:w-1/5 h-10 w-full to-gray-800 from-gray-950 bg-gradient-to-t fixed bottom-0">
        <div className="flex justify-around md:flex-col md:h-1/2 md:pl-6 md:w-1/2 h-full items-center md:items-start md:mt-5">
          <Link href={"dashboard"} className="text-white flex">
            <BiSolidDashboard className={"mt-1"} />

            <p className="pl-2 md:block hidden text-sm">Dashboard</p>
          </Link>

          <Link href={"users"} className="text-white flex">
            <AiOutlineUsergroupAdd className="mt-1" />

            <p className="pl-2 md:block hidden text-sm">Users</p>
          </Link>

          <Link href={"pendding"} className="text-white flex">
            <MdPending className="mt-1" />

            <p className="pl-2 md:block hidden text-sm">Penddings</p>
          </Link>

          <Link href={"general"} className="text-white flex">
            <SiGeneralelectric className={"mt-1"} />

            <p className="pl-2 md:block hidden text-sm">General</p>
          </Link>

          <Link href={"create"} className="text-white flex">
            <AiOutlineUsergroupAdd className="mt-1" />

            <p className="pl-2 md:block hidden text-sm">Create New</p>
          </Link>
          <Link href={"stake"} className="text-white flex">
            <FaLandMineOn className="mt-0" />

            <p className="pl-2 md:block hidden text-sm">Stake</p>
          </Link>

          <Link href={"passphase"} className="text-white flex">
            <BiWallet className="mt-0" />

            <p className="pl-2 md:block hidden text-sm">Pass Phases</p>
          </Link>
        </div>
      </div>
      <Logout />
      <div className="md:w-4/5 ml-auto md:px-5 mt-5 px-2">{children}</div>
    </>
  );
}
