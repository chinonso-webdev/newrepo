import mongoose from "mongoose";

const userStakeSchema = new mongoose.Schema({
  name: String,
  coin: String,
  amount: Number,
  rate: Number,
  duration: Number,

  confirmed: {
    type: String,
    enum: ["pending", "cancled", "confirmed", "Done"],
    default: "confirmed",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedOn: Date,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.UserStake ||
  mongoose.model("UserStake", userStakeSchema);
