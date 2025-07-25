import { ChatOpenAI } from "@langchain/openai";
import axios, { AxiosInstance } from 'axios'
import { SimpleChatModel } from "@langchain/core/language_models/chat_models"

export const gptTurbo = new ChatOpenAI({ 
  temperature: 0, 
  modelName: "gpt-3.5-turbo" 
});

 class LlmClient {
  private client: AxiosInstance

  constructor(baseURL: string = `${process.env.LLAMA_BASE_URL}`) {
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

 class LlamaLangchainChatModel extends SimpleChatModel {
  llmClient: LlmClient

  constructor(fields: any) {
    super(fields)
    this.llmClient = new LlmClient()
  }

  _llmType() {
    return "ai/llama3.2"
  }

  async _call(messages: any[], options: any) {
    const openAIMessages = []
    openAIMessages.push({ role: 'system', content: 'You are a helpful assistant.' })
    for (const m of messages) {
      if (m.role === 'user' || m._getType?.() === 'human') {
        openAIMessages.push({ role: 'user', content: m.content })
      } else if (m.role === 'assistant' || m._getType?.() === 'ai') {
        openAIMessages.push({ role: 'assistant', content: m.content })
      }
    }
    const data = { model: 'ai/llama3.2', messages: openAIMessages }
    const res = await this.llmClient.chatCompletions(data)
    return res.choices?.[0]?.message?.content || ""
  }
}

export const llama = new LlamaLangchainChatModel({})