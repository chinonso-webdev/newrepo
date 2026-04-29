import React from 'react';
import EnterMnemonicPhrase from './connect';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

const ConnectWalletPage = async () => {
     const Userresponce = await getServerSession(authOptions);
    return (
        <div>

            <EnterMnemonicPhrase user={Userresponce} />
        </div>
    );
};

export default ConnectWalletPage;