import express from "express";
import { userRouter } from "./user";
import { expenseRouter } from "./expense";
import { purchaseRouter } from "./purchase";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/user/expense", expenseRouter);
rootRouter.use("/user/purchase", purchaseRouter);
rootRouter.use("/checkout")
