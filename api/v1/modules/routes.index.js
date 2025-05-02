import express from "express";
import authRoutes from "./auth/route/auth.route.js";
import productRoutes from "./product/route/product.route.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;