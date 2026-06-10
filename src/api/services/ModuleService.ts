import { API_CONFIG } from "../../config/api";
import type { AllModule } from "../../types/Types";
import { apiClient } from "../client";

class ModuleServce {
  private getAllEndpoint = API_CONFIG.endpoints.modules.getAll;

  async getAll(): Promise<AllModule[]> {
    return apiClient.get<AllModule[]>(this.getAllEndpoint);
  }
}

export const moduleService = new ModuleServce();
