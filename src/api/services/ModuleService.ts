import { API_CONFIG } from "../../config/api";
import type { AllModule } from "../../types/Types";
import { apiClient } from "../client";

class ModuleServce {
  private getAllEndpoint = API_CONFIG.endpoints.modules.getAll;
  private createEndpoint = API_CONFIG.endpoints.modules.create;
  private updateEndpoint = API_CONFIG.endpoints.modules.update;
  private deleteEndpoint = API_CONFIG.endpoints.modules.delete;

  async getAll(): Promise<AllModule[]> {
    return apiClient.get<AllModule[]>(this.getAllEndpoint);
  }

  async create(name: string): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, { name });
  }

  async update(
    moduleId: number,
    name: string,
    isActive: boolean,
  ): Promise<any> {
    return apiClient.put<any>(this.updateEndpoint, {
      moduleId,
      name,
      isActive,
    });
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${id}`);
  }
}

export const moduleService = new ModuleServce();
