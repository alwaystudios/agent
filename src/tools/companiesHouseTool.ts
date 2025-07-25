import { Tool } from "langchain/tools";
import { CompaniesHouseClient } from "../lib/companiesHouse";
import { CompaniesHouseDirectorRequest } from "../types";

export class CompaniesHouseTool extends Tool {
  name = "companies_house_director";
  description = "Check Companies House for director information and appointments";

  async _call(input: string) {
    const client = new CompaniesHouseClient();
    const request: CompaniesHouseDirectorRequest = JSON.parse(input);
    const data = await client.directorSearch(request);
    return JSON.stringify(data);
  }
} 