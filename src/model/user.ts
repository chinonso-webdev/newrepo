import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email for this Wallet."],
    unique: [true, "Email address already exists"],
  },
  password: {
    type: String,
  },

  kyc: String,
  role: {
    type: String,
    default: "user",
  },
  fullname: String,
  phoneNumber: String,
  country : String,
  balance: {
    BTC: {
      type: Number,
      default: 0,
    },
    TRX: {
      type: Number,
      default: 0,
    },
    LTC: {
      type: Number,
      default: 0,
    },
    XRP: {
      type: Number,
      default: 0,
    },
    USDTtrc20: {
      type: Number,
      default: 0,
    },
    USDTerc20: {
      type: Number,
      default: 0,
    },
    DOGE: {
      type: Number,
      default: 0,
    },
    ETH: {
      type: Number,
      default: 0,
    },
    XLM: {
      type: Number,
      default: 0,
    },
    BNB: {
      type: Number,
      default: 0,
    },
    ADA: {
      type: Number,
      default: 0,
    },
    FTM: {
      type: Number,
      default: 0,
    },
    MATIC: {
      type: Number,
      default: 0,
    },
    SHIB: {
      type: Number,
      default: 0,
    },
    ALGO: {
      type: Number,
      default: 0,
    },
    PEPE: {
      type: Number,
      default: 0,
    },
    SOL: {
      type: Number,
      default: 0,
    },
    LUNA: {
      type: Number,
      default: 0,
    },
    XDC: {
      type: Number,
      default: 0,
    },
    LUNC: {
      type: Number,
      default: 0,
    },
    SUI: {
      type: Number,
      default: 0,
    },
    HBAR: {
      type: Number,
      default: 0,
    },
  },
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
  createdOn: {
    type: String,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
