import express from "express";
import { userRouter } from "./user";
import { expenseRouter } from "./expense";
import { purchaseRouter } from "./purchase";
import { PasswordRouter } from "./password";
import { premiumFeaturesRouter } from "./premiumFeatures";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/user/expense", expenseRouter);
rootRouter.use("/user/purchase", purchaseRouter);
rootRouter.use("/password", PasswordRouter);
rootRouter.use("/user/premium-features",premiumFeaturesRouter )