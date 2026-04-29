import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa6"
import { CiHome, CiLight, CiLogout } from "react-icons/ci";
import { IoIosCog, IoIosNotificationsOutline, IoMdArrowRoundBack } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import InnerLayout from "@/components/innerlayout";

export default async function MainLayout({ children }: any) {
    const responce = await getServerSession(authOptions)

    if (!responce) {
        redirect('/login')
    }

    if (responce && responce?.user?.name === 'admin') {
        redirect('/admin/dashboard')
    }

    return <InnerLayout>{children}</InnerLayout>
}