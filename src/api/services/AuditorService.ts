import { API_CONFIG } from "../../config/api";
import type { AllAuditor } from "../../types/Types";
import { apiClient } from "../client";

class AuditorService {
  private getAllEndpoint = API_CONFIG.endpoints.auditors.getAll;
  private createEndpoint = API_CONFIG.endpoints.auditors.create;
  private deleteEndpiint = API_CONFIG.endpoints.auditors.delete;

  async getAll(): Promise<AllAuditor[]> {
    return apiClient.get<AllAuditor[]>(this.getAllEndpoint);
  }

  async create(fullName: string): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, { fullName });
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpiint}${id}`);
  }
}

export const auditorService = new AuditorService();
