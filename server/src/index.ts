import express from "express";
import { rootRouter } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();
const app = express();

app.use(helmet());

app.use(
  cors({
    exposedHeaders: ["Authorization", "user-auth-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", rootRouter);
app.listen(process.env.PORT || 3000);
