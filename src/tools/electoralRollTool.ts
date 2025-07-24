import { Tool } from "langchain/tools";
import { CreditSafeClient } from "../lib/creditsafe";
import { ElectoralRollRequest } from "../types";

export class ElectoralRollTool extends Tool {
  name = "electoral_roll";
  description = "Check the electoral roll for a person";

  async _call(input: string) {
    const client = new CreditSafeClient();
    const request: ElectoralRollRequest = JSON.parse(input);
    const data = await client.checkElectoralRoll(request);
    return JSON.stringify(data);
  }
} 