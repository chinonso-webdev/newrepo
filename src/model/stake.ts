import mongoose from "mongoose";

const stakeSchema = new mongoose.Schema({
  name : String,
  amount: Number,
  rate: Number,
  duration: Number,

  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.Stake ||
  mongoose.model("Stake", stakeSchema);
