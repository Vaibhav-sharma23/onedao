import ResponseHandler from "../../../../../utils/response/ResponseHandler.js";
import ResponseStatus from "../../../../../utils/response/ResponseStatus.js";
import { initiateRegistration, verifyOtpAndRegister, login, logout } from "../repository/auth.repository.js";
import dotenv from "dotenv";
dotenv.config();
 
export const registerUser = async (req, res) => {
  try {
    const user = await initiateRegistration(req);
    return ResponseHandler.success(
      res,
      user,
      "User registered successfully",
      ResponseStatus.SUCCESS.CREATED
    );
  } catch (error) {
    const statusCode = error.status || ResponseStatus.SERVER_ERROR.INTERNAL_ERROR;
    return ResponseHandler.error(res, error.message, statusCode);
};
}

export const loginUser = async (req, res) => {
  try {
    const user = await login(req);
    if (!user) {
      return ResponseHandler.error(res, "Invalid credentials", 401);
    } else {
      return ResponseHandler.success(
        res,
        user,
        "Login successful",
        ResponseStatus.SUCCESS.OK
      );
    }
  } catch (error) {
    const statusCode = error.status || ResponseStatus.SERVER_ERROR.INTERNAL_ERROR;
    return ResponseHandler.error(res, error.message, statusCode);
  }
};
 
export const logoutUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return ResponseHandler.error(res, "Token is required", 400);
    }

    const result = await logout(token);
    if (!result) {
      return ResponseHandler.error(res, "Invalid token", 401);
    }

    return ResponseHandler.success(
      res,
      "Logout successful",
      ResponseStatus.SUCCESS.OK
    );
  } catch (error) {
    const statusCode = error.status || ResponseStatus.SERVER_ERROR.INTERNAL_ERROR;
    return ResponseHandler.error(res, error.message, statusCode);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await forgot(req);
    if (!user) {
      return ResponseHandler.error(res, "Invalid token", 401);
    } else {
      return ResponseHandler.success(
        res,
        user,
        "OTP sended on your email",
        ResponseStatus.SUCCESS.OK
      );
    }
  } catch (error) {
    const statusCode = error.status || ResponseStatus.SERVER_ERROR.INTERNAL_ERROR;
    return ResponseHandler.error(res, error.message, statusCode);
  }
};
 
export const verifyOtp = async (req, res) => {
  try {
    const user = await verifyOtpAndRegister(req);
    if (!user) {
      return ResponseHandler.error(res, "Invalid token", 401);
    } else {
      return ResponseHandler.success(
        res,
        user,
        "User verified",
        ResponseStatus.SUCCESS.OK
      );
    }
  } catch (error) {
    const statusCode = error.status || ResponseStatus.SERVER_ERROR.INTERNAL_ERROR;
    return ResponseHandler.error(res, error.message, statusCode);
  }
};
