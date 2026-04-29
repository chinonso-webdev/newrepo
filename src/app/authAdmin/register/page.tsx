import RegistersComponent from "@/components/register";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Registers() {
    const responce = await getServerSession(authOptions)
    if (responce) {
        redirect('/main/assetpage')
    }


    return <>
        <RegistersComponent />
    </>
}