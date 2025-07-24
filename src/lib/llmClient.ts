import axios, { AxiosInstance } from 'axios'
// @ts-ignore
import { SimpleChatModel } from "@langchain/core/language_models/chat_models"

const BASE_URL = process.env.LLAMA_BASE_URL;

export class LlmClient {
  private client: AxiosInstance

  constructor(baseURL: string = `${BASE_URL}`) {
    this.client = axios.create({ baseURL })
  }

  async listModels() {
    const res = await this.client.get('/models')
    return res.data
  }

  async getModel(namespace: string, name: string) {
    const res = await this.client.get(`/models/${namespace}/${name}`)
    return res.data
  }

  async chatCompletions(data: any) {
    const res = await this.client.post('/chat/completions', data)
    return res.data
  }

  async completions(data: any) {
    const res = await this.client.post('/completions', data)
    return res.data
  }

  async embeddings(data: any) {
    const res = await this.client.post('/embeddings', data)
    return res.data
  }
}

export class LlamaLangchainChatModel extends SimpleChatModel {
  llmClient: LlmClient

  constructor(fields: any) {
    super(fields)
    this.llmClient = new LlmClient()
  }

  _llmType() {
    return "llama3.2-local"
  }

  async _call(messages: any[], options: any) {
    const formatted = messages.map(m => m.content).join("\n")
    const data = { messages: [{ role: "user", content: formatted }] }
    const res = await this.llmClient.chatCompletions(data)
    return res.choices?.[0]?.message?.content || ""
  }
}

