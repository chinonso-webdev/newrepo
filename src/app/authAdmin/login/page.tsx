import AdminLoginComponent from "@/components/adminLogin";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);
    
    // Redirect if already logged in
    if (session) {
        // Check if user has admin role
        if ((session.user as { role?: string })?.role === "admin") {
            redirect('/admin/dashboard');
        } else {
            // Regular users should go to main page
            redirect('/main/assetpage');
        }
    }

    return <>
        <AdminLoginComponent />
    </>
}