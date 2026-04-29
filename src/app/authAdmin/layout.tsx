import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthAdmin({ children }: any) {
    const responce = await getServerSession(authOptions)

    if (!responce) {
        redirect('/authAdmin/login')
    }

    if (responce && responce?.user?.name !== 'admin') {
        redirect('/main/assetpage')
    }

    return <>
        {children}
    </>
}