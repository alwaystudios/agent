import { Tool } from "langchain/tools";
import axios from 'axios';
export class McpTool extends Tool {
  name: string;
  description: string;
  constructor(toolName: string, toolDescription: string) {
    super();
    this.name = toolName;
    this.description = toolDescription;
  }
  async _call(input: string) {
    const res = await axios.post(`${process.env.MCP_PROXY_URL}/mcp`, { tool: this.name, input: JSON.parse(input) });
    return res.data.result;
  }
} 