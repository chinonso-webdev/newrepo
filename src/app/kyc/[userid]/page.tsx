import { useRouter } from "next/router";
import KYCPage from "../kycpage";

export default async function KysSlog({ params }: { params: Promise<{ userid: string }> }) {
    const slug = (await params).userid
    return <KYCPage id={slug} />
}
