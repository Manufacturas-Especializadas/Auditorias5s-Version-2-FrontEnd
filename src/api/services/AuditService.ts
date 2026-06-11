import { API_CONFIG } from "../../config/api";
import type { CreateAuditPayload } from "../../types/Types";
import { apiClient } from "../client";

class AuditService {
  private createEndpoint = API_CONFIG.endpoints.audit.create;

  async saveAudit(payload: CreateAuditPayload): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const auditService = new AuditService();
