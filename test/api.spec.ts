import { test, expect, APIRequestContext } from '@playwright/test'

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000'

test('GET /mcp returns tool manifest', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.get(`${baseURL}/mcp`)
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.tools).toBeDefined()
  expect(Array.isArray(data.tools)).toBeTruthy()
  expect(data.tools.length).toBe(2)
  expect(data.tools[0].name).toBe('electoral_roll')
  expect(data.tools[1].name).toBe('companies_house_director')
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

test('POST /mcp invokes companies_house_director tool', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/mcp`, {
    data: {
      tool: 'companies_house_director',
      input: {
        forename: 'John',
        surname: 'Doe',
        dateOfBirth: '1980-01-01',
        companyName: 'Test Company Ltd'
      }
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.result).toBeDefined()
  const result = JSON.parse(data.result)
  expect(result.correlationId).toBeDefined()
  expect(result.uniqueId).toBeDefined()
  expect(result.directorName).toBe('John Doe')
  expect(result.totalAppointments).toBeDefined()
  expect(result.activeAppointments).toBeDefined()
  expect(result.appointments).toBeDefined()
  expect(Array.isArray(result.appointments)).toBeTruthy()
})

test('PASS: Director found on electoral roll + active company appointments (John Doe)', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/vetting`, {
    data: {
      name: 'John Doe',
      dob: '1980-01-01',
      companyName: 'Established Company Ltd'
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.output).toBeDefined()
  
  let result
  try {
    result = JSON.parse(data.output)
  } catch {
    throw new Error('Output is not valid JSON')
  }
  
  expect(typeof result.pass).toBe('boolean')
  expect(typeof result.reason).toBe('string')
  expect(typeof result.summary).toBe('string')
  expect(result.pass).toBe(true)
})

test('FAIL: Director found on electoral roll + dissolved companies (Jane Smith)', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/vetting`, {
    data: {
      name: 'Jane Smith',
      dob: '1975-05-15',
      companyName: 'Failed Ventures Ltd'
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.output).toBeDefined()
  
  let result
  try {
    result = JSON.parse(data.output)
  } catch {
    throw new Error('Output is not valid JSON')
  }
  
  expect(typeof result.pass).toBe('boolean')
  expect(typeof result.reason).toBe('string')
  expect(typeof result.summary).toBe('string')
  expect(result.pass).toBe(false)
})

test('PASS: Partial electoral roll match + clean company record (Bob Wilson)', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/vetting`, {
    data: {
      name: 'Bob Wilson',
      dob: '1985-03-20',
      companyName: 'Clean Records Ltd'
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.output).toBeDefined()
  
  let result
  try {
    result = JSON.parse(data.output)
  } catch {
    throw new Error('Output is not valid JSON')
  }
  
  expect(typeof result.pass).toBe('boolean')
  expect(typeof result.reason).toBe('string')
  expect(typeof result.summary).toBe('string')
  expect(result.pass).toBe(true)
})

test('FAIL: Not found on electoral roll + dissolved companies (Unknown Person)', async ({ request }: { request: APIRequestContext }) => {
  const res = await request.post(`${baseURL}/vetting`, {
    data: {
      name: 'Unknown Person',
      dob: '1900-01-01',
      companyName: 'Dissolved Company Ltd'
    }
  })
  expect(res.ok()).toBeTruthy()
  const data = await res.json()
  expect(data.output).toBeDefined()
  
  let result
  try {
    result = JSON.parse(data.output)
  } catch {
    throw new Error('Output is not valid JSON')
  }
  
  expect(typeof result.pass).toBe('boolean')
  expect(typeof result.reason).toBe('string')
  expect(typeof result.summary).toBe('string')
  expect(result.pass).toBe(false)
}) 