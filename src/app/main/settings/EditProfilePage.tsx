'use client';

import axios from 'axios';
import { useState } from 'react';

import { FaPerson } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';

export default function EditProfile({ infoString }: any) {
    const userInfo = JSON.parse(infoString);
    const [fullname, setFullname] = useState(userInfo.fullname);
    const [email, setemail] = useState(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
    const [country, setcountry] = useState(userInfo.country);
    const [id, _] = useState(userInfo._id);

    async function doUpdate() {
        toast.info('Updating Profile...');
        await axios.put('/register/api', { id, fullname, email, phoneNumber, country });
        toast.success('Profile Updated Successfully');
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6 text-center">
                <div className="flex justify-center">
                    <FaPerson className='rounded-full border-4 border-blue-500 text-5xl' />
                </div>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="mt-4 w-full text-2xl font-semibold text-center border p-2 rounded-lg"
                />

                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-4 w-full text-2xl font-semibold text-center border p-2 rounded-lg"
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="mt-2 w-full text-gray-500 text-center border p-2 rounded-lg"
                />

                <input
                    type="text"
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                    className="mt-2 w-full text-gray-500 text-center border p-2 rounded-lg"
                />

                <div className="mt-6">
                    <button onClick={doUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Save Changes
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}
