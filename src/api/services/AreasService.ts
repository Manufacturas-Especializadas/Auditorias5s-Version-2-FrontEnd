import { API_CONFIG } from "../../config/api";
import type { CreateAreas } from "../../types/Types";
import { apiClient } from "../client";

class AreasServices {
  private createEndpoint = API_CONFIG.endpoints.areas.create;

  async create(data: CreateAreas): Promise<void> {
    return apiClient.post<void>(this.createEndpoint, data);
  }
}

export const areasService = new AreasServices();
