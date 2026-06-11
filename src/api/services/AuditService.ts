import { API_CONFIG } from "../../config/api";
import type { AuditHistory, CreateAuditPayload } from "../../types/Types";
import { apiClient } from "../client";

class AuditService {
  private historyEndpoint = API_CONFIG.endpoints.audit.history;
  private downloadExcelEndpoint = API_CONFIG.endpoints.audit.downloadExcel;
  private createEndpoint = API_CONFIG.endpoints.audit.create;

  async getHistory(): Promise<AuditHistory[]> {
    return apiClient.get<AuditHistory[]>(this.historyEndpoint);
  }

  async downloadExcelReport(auditId: number): Promise<Blob> {
    const response = await apiClient.get<Blob>(
      `${this.downloadExcelEndpoint}${auditId}`,
      {
        responseType: "blob",
      },
    );
    return response;
  }

  async saveAudit(payload: CreateAuditPayload): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const auditService = new AuditService();
