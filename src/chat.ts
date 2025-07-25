import { llama as llm } from './lib/llmClient'

export async function chatLLM(prompt: string): Promise<string> {
  const res = await llm.invoke(prompt)
  return res.text
} 