import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./api/v1/modules/routes.index.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port:", process.env.PORT);
});