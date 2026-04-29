import { authOptions } from '@/libs/auth';
import dbConnect from '@/libs/dbConnect';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import User from '@/model/user';
import { FaPerson } from 'react-icons/fa6';
import user from '@/model/user';
import Link from 'next/link';

export default async function ProfilePage() {
    const Userresponce = await getServerSession(authOptions) as any;
    await dbConnect();
    const userInfo = await User.findOne({
        email: Userresponce?.user?.email,
    }).exec();
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6 text-center">
                <div className="flex justify-center">
                    <FaPerson className='rounded-full border-4 border-blue-500 text-5xl' />
                </div>
                <h2 className="text-2xl font-semibold mt-4">{userInfo?.fullname}</h2>
                <p className="text-gray-600">{userInfo?.email} </p>
                <p className="text-gray-500 mt-2">{userInfo?.phoneNumber}</p>
                <p className="text-gray-500 mt-2">📍 {userInfo?.country}</p>

                {/* <div className="mt-4 flex justify-center gap-4">
                    <a href="#" className="text-blue-500 hover:underline">Twitter</a>
                    <a href="#" className="text-blue-500 hover:underline">GitHub</a>
                    <a href="#" className="text-blue-500 hover:underline">LinkedIn</a>
                </div> */}

                <div className="mt-6">
                    <Link href={'/main/settings'} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
