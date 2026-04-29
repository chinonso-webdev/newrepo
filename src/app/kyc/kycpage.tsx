'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function KYCPage({ id }: any) {
    const [frontImage, setFrontImage] = useState(null);
    const [previewFront, setPreviewFront] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: any, setImage: any, setPreview: any) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Only image files are allowed.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB.');
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        if (!frontImage) {
            alert('Please upload images of your Id.');
            setIsLoading(false)
            return;
        }
        toast('loading...')
        const formData = new FormData();
        formData.append('frontImage', frontImage);
        formData.append('id', id);

        try {

            const response = await axios.post('/kyc/api', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (Number(response.status) > 300 && Number(response.status) < 400) throw new Error('Upload failed');
            alert('KYC submitted successfully!');
            router.replace('/main/assetpage')
            // const logindata = await signIn("credentials", {
            //     email: newUser.data.email,
            //     password: newUser.data.password,
            //     callbackUrl: '/main/assetpage'
            // })
        } catch (error: any) {
            console.log(error)
            alert(error);
        }
    };

    return (
        <div className="w-full overflow-hidden h-screen relative flex md:justify-center md:items-center">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-500">KYC Verification</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Front of ID</label>

                        <input type="file" className='mx-auto' accept="image/*" onChange={(e) => handleFileChange(e, setFrontImage, setPreviewFront)} />
                        <div className="flex w-full justify-center items-center">
                            {previewFront && <Image src={previewFront} alt="Front of ID" width={200} height={120} className="mt-2 rounded" />}
                        </div>
                    </div>

                    {/* <div className="mb-4">
                    <label className="block font-medium mb-1">Back of ID</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBackImage, setPreviewBack)} />
                    {previewBack && <Image src={previewBack} alt="Back of ID" width={200} height={120} className="mt-2 rounded" />}
                </div> */}

                    {isLoading ?
                        <div className="md:w-full w-10/12 mx-auto bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 md:static absolute bottom-2 flex justify-center items-center">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span
                                >
                            </div>
                        </div>
                        :
                        <button type="submit" className="md:w-full w-10/12 mx-auto bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 md:static absolute bottom-2">
                            Submit
                        </button>



                    }

                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
