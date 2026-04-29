import { authOptions } from '@/libs/auth';
import dbConnect from '@/libs/dbConnect';
import { getServerSession } from 'next-auth';
import EditProfile from './EditProfilePage';
import User from '@/model/user';

export default async function EditProfilePage() {
    const Userresponce = await getServerSession(authOptions) as any;
    await dbConnect();
    const userInfo = await User.findOne({
        email: Userresponce?.user?.email,
    }).exec();

    return <EditProfile infoString={JSON.stringify(userInfo)} />;
}
