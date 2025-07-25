import { ElectoralRollResponse, ElectoralRollResident, CompaniesHouseDirectorResponse } from '../types';

export interface TestPerson {
  forename: string;
  surname: string;
  electoralRoll: {
    found: boolean;
    residents: ElectoralRollResident[];
  };
  companiesHouse: {
    activeAppointments: number;
    disqualifications: number;
    riskFlags: string[];
    appointments: any[];
  };
}

export const TEST_DATA: Record<string, TestPerson> = {
  'john_doe': {
    forename: 'John',
    surname: 'Doe',
    electoralRoll: {
      found: true,
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
    },
    companiesHouse: {
      activeAppointments: 1,
      disqualifications: 0,
      riskFlags: [],
      appointments: [
        {
          appointedOn: '2020-01-15',
          role: 'Director',
          companyNumber: 'CH123456',
          companyName: 'Established Company Ltd',
          companyStatus: 'Active',
          address: {
            addressLine1: '123 Business Street',
            locality: 'London',
            postalCode: 'EC1A 1BB',
            country: 'England'
          }
        }
      ]
    }
  },
  'jane_smith': {
    forename: 'Jane',
    surname: 'Smith',
    electoralRoll: {
      found: true,
      residents: [
        {
          matchType: 'exact',
          name: 'Jane Smith',
          duration: '5 years',
          startDate: '2019-01-01',
          endDate: '2024-01-01',
          electoralRollValid: true,
          electoralRollHistory: []
        }
      ]
    },
    companiesHouse: {
      activeAppointments: 0,
      disqualifications: 1,
      riskFlags: ['Multiple dissolved companies'],
      appointments: [
        {
          appointedOn: '2018-05-10',
          resignedOn: '2020-03-15',
          role: 'Director',
          companyNumber: 'CH777777',
          companyName: 'Failed Ventures Ltd',
          companyStatus: 'Dissolved',
          address: {
            addressLine1: '456 Risk Street',
            locality: 'Birmingham',
            postalCode: 'B1 1AA',
            country: 'England'
          }
        },
        {
          appointedOn: '2021-01-01',
          resignedOn: '2022-12-31',
          role: 'Director',
          companyNumber: 'CH888888',
          companyName: 'Another Failed Co',
          companyStatus: 'Dissolved',
          address: {
            addressLine1: '789 Failure Ave',
            locality: 'Birmingham',
            postalCode: 'B2 2BB',
            country: 'England'
          }
        }
      ]
    }
  },
  'bob_wilson': {
    forename: 'Bob',
    surname: 'Wilson',
    electoralRoll: {
      found: true,
      residents: [
        {
          matchType: 'partial',
          name: 'Robert Wilson',
          duration: '2 years',
          startDate: '2022-01-01',
          endDate: '2024-01-01',
          electoralRollValid: true,
          electoralRollHistory: []
        }
      ]
    },
    companiesHouse: {
      activeAppointments: 1,
      disqualifications: 0,
      riskFlags: [],
      appointments: [
        {
          appointedOn: '2022-06-01',
          role: 'Director',
          companyNumber: 'CH555555',
          companyName: 'Clean Records Ltd',
          companyStatus: 'Active',
          address: {
            addressLine1: '789 Trustworthy St',
            locality: 'Leeds',
            postalCode: 'LS1 1AA',
            country: 'England'
          }
        }
      ]
    }
  },
  'unknown_person': {
    forename: 'Unknown',
    surname: 'Person',
    electoralRoll: {
      found: false,
      residents: []
    },
    companiesHouse: {
      activeAppointments: 0,
      disqualifications: 1,
      riskFlags: ['Multiple dissolved companies', 'Frequent company formations'],
      appointments: [
        {
          appointedOn: '2019-03-10',
          resignedOn: '2020-12-31',
          role: 'Director',
          companyNumber: 'CH999999',
          companyName: 'Dissolved Company Ltd',
          companyStatus: 'Dissolved',
          address: {
            addressLine1: 'Unknown Address',
            locality: 'Unknown',
            postalCode: 'Unknown',
            country: 'England'
          }
        }
      ]
    }
  }
};

export function getTestData(forename: string, surname: string): TestPerson | null {
  const key = `${forename.toLowerCase()}_${surname.toLowerCase()}`;
  return TEST_DATA[key] || null;
} 