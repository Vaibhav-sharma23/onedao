import express from 'express';
import restrictCountriesMiddleware from "../../../../../middleware/restrictCountries.js";
import { registerUser, verifyOtp, loginUser, logoutUser } from '../controller/auth.controller.js';
import { authenticate } from '../../../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', restrictCountriesMiddleware, registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.post('/otp', verifyOtp)

export default router;