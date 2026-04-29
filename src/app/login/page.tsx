import LoginComponent from "@/components/login";
import LoginPage from "@/components/login/login";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const responce = await getServerSession(authOptions)
    if (responce) {
        redirect('/main/assetpage')
    }

    return <>
        <LoginPage />
    </>
}