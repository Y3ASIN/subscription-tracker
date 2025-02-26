import { Client as WorkflowClient } from "@upstash/workflow";

import { QSTASG_URL, QSTASH_TOKEN } from "./env";

export const workFlowClient = new WorkflowClient({
  baseUrl: QSTASG_URL,
  token: QSTASH_TOKEN,
});
