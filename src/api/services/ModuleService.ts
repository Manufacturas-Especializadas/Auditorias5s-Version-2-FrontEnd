import { API_CONFIG } from "../../config/api";
import type { AllModule } from "../../types/Types";
import { apiClient } from "../client";

class ModuleServce {
  private getAllEndpoint = API_CONFIG.endpoints.modules.getAll;
  private createEndpoint = API_CONFIG.endpoints.modules.create;

  async getAll(): Promise<AllModule[]> {
    return apiClient.get<AllModule[]>(this.getAllEndpoint);
  }

  async create(name: string): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, { name });
  }
}

export const moduleService = new ModuleServce();
