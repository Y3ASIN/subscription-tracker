import express from "express";
import userRouter from "./router/user.router";
import authRouter from "./router/auth.router";
import subscriptionRouter from "./router/subscription.routes";
import connectToDB from "./database/mongodb";

const app = express();
const PORT = process.env.PORT;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is run on http://localhost:${PORT}`);
  
  await connectToDB();
});

export default app;
