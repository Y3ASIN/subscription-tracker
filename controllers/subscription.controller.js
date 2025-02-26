import { SERVER_URL } from "../config/env";
import { workFlowClient } from "../config/upstash";
import Subscription from "../models/subscription.model";

export const createSubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workFlowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId },
    });
  } catch (err) {
    next(err);
  }
};

export const getUsersSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        error: "You are not the owner of this account.",
      });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};
