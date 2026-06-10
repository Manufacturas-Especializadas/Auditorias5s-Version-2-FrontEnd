import { API_CONFIG } from "../../config/api";
import type { AllAreas } from "../../types/Types";
import { apiClient } from "../client";

class AreasServices {
  private getByIdEndpoint = API_CONFIG.endpoints.areas.getById;
  private createEndpoint = API_CONFIG.endpoints.areas.create;
  private updateEndpoint = API_CONFIG.endpoints.areas.update;
  private deleteEndpoint = API_CONFIG.endpoints.areas.delete;

  async getBy(id: number): Promise<AllAreas[]> {
    return apiClient.get<AllAreas[]>(`${this.getByIdEndpoint}${id}`);
  }

  async create(moduleId: number, name: string): Promise<void> {
    return apiClient.post<void>(this.createEndpoint, { moduleId, name });
  }

  async update(
    areaId: number,
    moduleId: number,
    name: string,
    isActive: boolean,
  ): Promise<any> {
    return apiClient.put<any>(this.updateEndpoint, {
      areaId,
      moduleId,
      name,
      isActive,
    });
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${id}`);
  }
}

export const areasService = new AreasServices();
