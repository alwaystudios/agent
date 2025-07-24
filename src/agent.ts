import 'dotenv/config';
import { ElectoralRollTool } from './tools/electoralRollTool';
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { LlamaLangchainChatModel } from "./lib/llmClient";

const SYSTEM_PROMPT = `
You are a credit check agent.
You will be given a person's name and date of birth.
You will need to check the electoral roll for the person.
You will need to check the credit report for the person.
You will need to check the company register for the person.
`;

export async function invoke(input: string) {
  const tools = [new ElectoralRollTool()];
  const model = new LlamaLangchainChatModel({});
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_PROMPT],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);
  const agent = await createToolCallingAgent({
    llm: model,
    tools,
    prompt,
  });
  const executor = new AgentExecutor({
    agent,
    tools,
  });
  const result = await executor.invoke({ input: `Vetting check for: ${input}` });
  return result.output;
}
