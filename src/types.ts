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

export type CompaniesHouseDirectorRequest = {
  forename: string
  surname: string
  dateOfBirth?: string
  companyName?: string
}

export type CompaniesHouseAppointment = {
  appointedOn: string
  resignedOn?: string
  role: string
  companyNumber: string
  companyName: string
  companyStatus: string
  address: {
    addressLine1: string
    locality: string
    postalCode: string
    country: string
  }
}

export type CompaniesHouseDirectorResponse = {
  correlationId: string
  uniqueId: string
  input: unknown
  directorName: string
  dateOfBirth?: string
  totalAppointments: number
  activeAppointments: number
  disqualifications: number
  appointments: CompaniesHouseAppointment[]
  riskFlags: string[]
} 