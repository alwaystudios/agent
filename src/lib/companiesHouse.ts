import 'dotenv/config'
import { CompaniesHouseDirectorRequest, CompaniesHouseDirectorResponse } from '../types'
import { getTestData } from '../data/testData'

export class CompaniesHouseClient {

  constructor() {
  }

  async directorSearch(request: CompaniesHouseDirectorRequest): Promise<CompaniesHouseDirectorResponse> {
    const testData = getTestData(request.forename, request.surname);
    
    const riskFlags = testData?.companiesHouse.riskFlags || [];
    const appointments = testData?.companiesHouse.appointments || [];
    const activeAppointments = testData?.companiesHouse.activeAppointments || 0;
    const disqualifications = testData?.companiesHouse.disqualifications || 0;

    return {
      correlationId: Math.random().toString(36).substring(7),
      uniqueId: Math.random().toString(36).substring(7),
      input: request,
      directorName: `${request.forename} ${request.surname}`,
      dateOfBirth: request.dateOfBirth,
      totalAppointments: appointments.length,
      activeAppointments,
      disqualifications,
      appointments,
      riskFlags
    }
  }
} 