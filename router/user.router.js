import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => {
  res.send({ title: "CREATE an users" });
});
userRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE all users" });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE all users" });
});

export default userRouter;
