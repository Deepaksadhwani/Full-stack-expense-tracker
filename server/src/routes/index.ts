import express from "express";
import { userRouter } from "./user";
import { expenseRouter } from "./expense";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/user/expense", expenseRouter);
