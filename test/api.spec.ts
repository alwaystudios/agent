import { test, expect, APIRequestContext } from '@playwright/test'

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000'

test('GET /mcp returns tool manifest', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.get(`${baseURL}/mcp`)
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.tools).toBeDefined()
  expect(Array.isArray(data.tools)).toBeTruthy()
  expect(data.tools[0].name).toBe('electoral_roll')
})

test('POST /mcp invokes electoral_roll tool', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/mcp`, {
    data: {
      tool: 'electoral_roll',
      input: {
        forename: 'John',
        surname: 'Doe',
        street: '123 Main St',
        city: 'London',
        postCode: 'E1 1AA'
      }
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.result).toBeDefined()
  const result = JSON.parse(data.result)
  expect(result.correlationId).toBeDefined()
  expect(result.uniqueId).toBeDefined()
  expect(result.input).toBeDefined()
  expect(result.common).toBeDefined()
}) 