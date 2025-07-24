export type ElectoralRollRequest = {
    forename: string
    surname: string
    dateOfBirth?: string
    buildingNo?: string
    buildingName?: string
    street: string
    city: string
    postCode: string
  }
  
  export type ElectoralRollResident = {
    matchType: string
    name: string
    duration: string
    startDate: string
    endDate: string
    electoralRollValid: boolean
    electoralRollHistory: unknown[]
  }
  
  export type ElectoralRollAddress = {
    address: string
    isCurrent: boolean
    residents: ElectoralRollResident[]
    undeclaredAddressType?: string
  }
  
  export type ElectoralRollReport = {
    reportTitle: string
    reportType: string
    summary?: unknown
    score?: {
      band: number
      version: string
      score: number
    }
    address: ElectoralRollAddress
    previousAddress1?: ElectoralRollAddress
    previousAddress2?: ElectoralRollAddress
  }
  
  export type ElectoralRollResponse = {
    correlationId: string
    uniqueId: string
    input: unknown
    common: unknown
    consumerResult: {
      applicant1Report: ElectoralRollReport
    }
  } 