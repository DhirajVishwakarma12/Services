const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    email:{
        type:String,
        required:true
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const otpModel= mongoose.model('Otp', otpSchema);
module.exports = otpModel
