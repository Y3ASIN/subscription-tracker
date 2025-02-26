import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware";
import {
  createSubscription,
  getUsersSubscriptions,
} from "../controllers/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscription!" }),
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET subscription details!" }),
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE subscription!" }),
);

subscriptionRouter.delete("/", (req, res) =>
  res.send({ title: "DELETE subscription!" }),
);

subscriptionRouter.get("/user/:id", authorize, getUsersSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel subscription!" }),
);

subscriptionRouter.get("/upcoming-renewal", (req, res) =>
  res.send({ title: "GET upcoming renewals!" }),
);

export default subscriptionRouter;
