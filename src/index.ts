import express, { Request, Response } from 'express'
import { ElectoralRollTool } from './tools/electoralRollTool'
import { CompaniesHouseTool } from './tools/companiesHouseTool'
import { invoke } from './agent'
import { chatLLM } from './chat'

const app = express()
app.use(express.json())

app.get('/health', (req: Request, res: Response) => res.send('ok'))

app.get('/mcp', (req: Request, res: Response) => {
  console.log('GET /mcp')
  res.json({
    tools: [
      {
        name: 'electoral_roll',
        description: 'Check the electoral roll for a person',
        input: 'ElectoralRollRequest JSON string',
        output: 'ElectoralRollResponse JSON string'
      },
      {
        name: 'companies_house_director',
        description: 'Check Companies House for director information and appointments',
        input: 'CompaniesHouseDirectorRequest JSON string',
        output: 'CompaniesHouseDirectorResponse JSON string'
      }
    ]
  })
})

app.post('/mcp', async (req: Request, res: Response) => {
  console.log('POST /mcp', req.body)
  const { tool, input } = req.body
  if (tool === 'electoral_roll') {
    const t = new ElectoralRollTool()
    const result = await t._call(JSON.stringify(input))
    res.json({ result })
    return
  }
  if (tool === 'companies_house_director') {
    const t = new CompaniesHouseTool()
    const result = await t._call(JSON.stringify(input))
    res.json({ result })
    return
  }
  res.status(400).json({ error: 'Unknown tool' })
})

app.post('/vetting', async (req: Request, res: Response) => {
  const { name, dob, companyName } = req.body
  const prompt = `Vetting check for director: Name: ${name}, DOB: ${dob}, Company: ${companyName}`
  const output = await invoke(prompt)
  res.json({ output })
})

app.post('/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' })
    return
  }
  const output = await chatLLM(prompt)
  res.json({ output })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
