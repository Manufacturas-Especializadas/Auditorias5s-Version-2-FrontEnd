import { API_CONFIG } from "../../config/api";
import type { AllModule, CreateModule } from "../../types/Types";
import { apiClient } from "../client";

class ModuleServce {
  private getAllEndpoint = API_CONFIG.endpoints.modules.getAll;
  private createEndpoint = API_CONFIG.endpoints.modules.create;

  async getAll(): Promise<AllModule[]> {
    return apiClient.get<AllModule[]>(this.getAllEndpoint);
  }

  async create(data: CreateModule): Promise<void> {
    return apiClient.post<void>(this.createEndpoint, data);
  }
}

export const moduleService = new ModuleServce();
