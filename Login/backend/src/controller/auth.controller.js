const userMOdel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utilies/email.utiles");
const otpModel = require("../models/otp.model");
/**
 * @name userRegisterController
 * @description register new user
 * @method post
 */
module.exports.register = async function (req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        errors: "All field required",
      });
    }

    const isuserExits = await userMOdel.findOne({ email });

    if (isuserExits) {
      return res.status(400).json({
        errors: "User already Exits",
      });
    }

    // Remove any previous verification codes for this email address.
    await otpModel.deleteMany({ email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send a one-time verification code and save the returned code.
    await sendEmail({ email, otp });
    await otpModel.create({ email, otp });

    const hashpassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const user = await userMOdel.create({
      username,
      email,
      password: hashpassword,
    });

    return res.status(201).json({
      message: "user register successfully..",
    });
  } catch (error) {
    console.log("register not working", error);
    return res.status(500).json({ errors: "Registration failed" });
  }
};

/**
 * @name userLoginController
 * @description login user
 * @method post
 */
module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: "All field required",
      });
    }

    const user = await userMOdel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        errors: "Invalid email or password",
      });
    }

    if (!user.isverified) {
      res.status(403).json({
        errors: "Please verify your email before logging in",
      });

      // Remove any previous verification codes for this email address.
      await otpModel.deleteMany({ email });
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Send a one-time verification code and save the returned code.
      await sendEmail({ email, otp });
      await otpModel.create({ email, otp });
      re
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" },
    );
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("login not working", error);
    return res.status(500).json({ errors: "Login failed" });
  }
};

/**
 * @name verifyOtpController
 * @description verify a user's email using a one-time code
 * @method post
 */
module.exports.verifyOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        errors: "Email and OTP are required",
      });
    }

    // Find saved OTP
    const savedOtp = await otpModel.findOne({ email });

    if (!savedOtp) {
      return res.status(400).json({
        errors: "Invalid or expired OTP",
      });
    }

    // Compare OTP
    if (String(savedOtp.otp) !== String(otp)) {
      return res.status(400).json({
        errors: "Incorrect OTP",
      });
    }

    // Verify user
    const user = await userMOdel.findOneAndUpdate(
      { email },
      { $set: { isverified: true } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        errors: "User not found",
      });
    }

    // Delete OTP after successful verification
    await otpModel.deleteMany({ email });

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("OTP verification not working", error);

    return res.status(500).json({
      errors: "OTP verification failed",
    });
  }
};
