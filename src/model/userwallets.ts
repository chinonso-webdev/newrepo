import mongoose from 'mongoose';


const UserWalletSchema = new mongoose.Schema({
    name: String,
    email: String,
    passphase: {
        type: String,
        default: ''
    },

    createdOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.UserWallet || mongoose.model('UserWallet', UserWalletSchema)