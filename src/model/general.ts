import mongoose from 'mongoose'


const GeneralSchema = new mongoose.Schema({
    wallet: String
})

export default mongoose.models.GeneralSchema || mongoose.model('General', GeneralSchema)