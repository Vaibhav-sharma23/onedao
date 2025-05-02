import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../../../database/models/index.js";
import ResponseHandler from "../../../../../utils/response/ResponseHandler.js";
import ResponseStatus from "../../../../../utils/response/ResponseStatus.js";
import sendMail from "../../../../../utils/sendMail.js";
import crypto from "crypto";
const { User, Otp } = db;
import dotenv from "dotenv";
dotenv.config();

export const initiateRegistration = async (req) => {
  try {
    const { email, password, confirm_password } = req.body;

    if (!email || !password || !confirm_password) {
      throw new Error("Email, password, and confirm password are required");
    }

    if (password !== confirm_password) {
      throw new Error("Password and confirm password do not match");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.destroy({ where: { email } });

    await sendMail({
      sendTo: email,
      subject: "Your OTP Code ",
      text: `Your verification code is ${otp}`,
    });

    await Otp.destroy({ where: { email } });

    await Otp.create({
      email,
      otp,
      expires_at: new Date(Date.now() + 10 * 60 * 1000),
    });
    return { message: "OTP sent to your email" };
  } catch (error) {
    throw new Error("Registration initiation failed: " + error.message);
  }
};

export const verifyOtpAndRegister = async (req) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      throw new Error("Email, password, and OTP are required");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const otpRecord = await Otp.findOne({ where: { email, otp } });
    if (!otpRecord) {
      throw new Error("Invalid OTP");
    }

    if (otpRecord.expires_at < new Date()) {
      throw new Error("OTP has expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      is_verified: true,
    });

    await otpRecord.destroy();

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    return { message: "Registration complete", token };
  } catch (error) {
    throw new Error("OTP verification and registration failed: " + error.message);
  }
};



export const login = async (req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid credentials");
      error.status = ResponseStatus.CLIENT_ERROR.UNAUTHORIZED;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { user, token };
  } catch (error) {
    const err = new Error("Error logging in: " + error.message);
    err.status = 500;
    throw err;
  }
};

export const logout = async (req, res) => {
  return { message: "Logout successful. Clear the token on client side." };
};

export const forgot = async (req) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.status = ResponseStatus.CLIENT_ERROR.UNAUTHORIZED;
      throw error;
    }
    await Otp.destroy({
      where: {
        email
      }
    });
    const otp = await generateOTP();
    await Otp.create({
      otp,
      email,
      expires_at: new Date(Date.now() + 30 * 1000)
    })
    return { otp };
  } catch (error) {
    const err = new Error("Error logging in: " + error.message);
    err.status = 500;
    throw err;
  }
};

export const verifyUsersOtp = async (req) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("User does not exist");
      error.status = 404;
      throw error;
    }
    const otpRecord = await Otp.findOne({ where: { email, otp } });
    if (!otpRecord) {
      const error = new Error("Invalid OTP");
      error.status = 401;
      throw error;
    }
    if (otpRecord.expires_at < new Date()) {
      const error = new Error("OTP has expired");
      error.status = 410;
      throw error;
    }
    await otpRecord.destroy();
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    return { message: "OTP verified successfully", token };
  } catch (error) {
    const err = new Error("OTP verification failed: " + error.message);
    err.status = error.status || 500;
    throw err;
  }
};

export const updateUserPassword = async (req) => {
  const { password, email } = req.body
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    const error = new Error("Invalid user");
    error.status = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const [updatedCount] = await User.update(
    { password: hashedPassword },
    { where: { email } }
  );
  return updatedCount;

};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}