import 'dotenv/config'
import { ElectoralRollRequest, ElectoralRollResponse } from '../types'

export class CreditSafeClient {

  constructor() {
  }

  async directorSearch(criteria: Record<string, unknown>): Promise<unknown> {
    return { stub: 'director search result', criteria }
  }

  async directorReport(directorId: string): Promise<unknown> {
    return { stub: 'director report result', directorId }
  }

  async checkElectoralRoll(address: ElectoralRollRequest): Promise<ElectoralRollResponse> {
    const body = {
      common: {
        person: {
          currentName: {
            forename: address.forename,
            surname: address.surname
          },
          dateOfBirth: address.dateOfBirth,
          addresses: {
            current: {
              buildingNo: address.buildingNo,
              buildingName: address.buildingName,
              street: address.street,
              city: address.city,
              postCode: address.postCode
            }
          }
        }
      },
      consumer: {
        reason: 'AddressVerification',
        thirdPartyOptIn: false
      },
      products: ['Consumer']
    }

    return {
      correlationId: '123',
      uniqueId: '123',
      input: body,
      common: {},
      consumerResult: {
        applicant1Report: {
          reportTitle: 'Electoral Roll',
          reportType: 'Consumer', 
          address: {
            address: '123 The Street, The City, The Postcode',
            isCurrent: true,
            residents: [
              {
                matchType: 'exact',
                name: 'John Doe',
                duration: '10 years',
                startDate: '2015-01-01',
                endDate: '2025-01-01',
                electoralRollValid: true,
                electoralRollHistory: []
              }
            ]
          }
        }
      }
    }
  }
} 