import express, { Request, Response } from 'express'
import { ElectoralRollTool } from './tools/electoralRollTool'

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
  res.status(400).json({ error: 'Unknown tool' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
