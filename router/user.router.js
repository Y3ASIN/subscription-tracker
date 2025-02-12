import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "GET all users" });
});
userRouter.get("/id", (req, res) => {
  res.send({ title: "GET a users" });
});
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
