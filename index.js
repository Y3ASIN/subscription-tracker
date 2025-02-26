import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env";
import userRouter from "./router/user.router";
import authRouter from "./router/auth.router";
import subscriptionRouter from "./router/subscription.router";
import connectToDB from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import arcjetMiddleware from "./middlewares/arcjet.middleware";
import workflowRouter from "./router/workflow.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

// Test route for arcjet, weater it is working or not
app.get("/test", (req, res) => {
  console.log("✅ Route handler executed");
  res.json({ message: "Success! Arcjet allowed this request." });
});

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is run on http://localhost:${PORT}`);

  await connectToDB();
});

export default app;
