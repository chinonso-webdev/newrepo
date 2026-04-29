import mongoose from 'mongoose';


const HistorySchema = new mongoose.Schema({
    coin: String,
    amount: Number,
    direction: {
        type: String,
        enum: ['out', 'in']
    },
    wallet: {
        type: String,
        default: ''
    },
    confirmed: {
        type: String,
        enum: ['pending', 'cancled', 'confirmed'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.History || mongoose.model('History', HistorySchema)